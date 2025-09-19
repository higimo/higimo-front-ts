import { WorkerType } from 'types'

import { useState } from 'preact/hooks'
import useApi, { API_STATUS } from 'hook/use-api'
import { Loading } from 'components/ui/loading'
import { CollapseSection } from 'components/ui/collapse-section'


import './style.css'
import { API_ROUTE } from 'dic/api-route'
import { NotFoundData } from 'components/ui/not-found-data'
import { WorkersTree } from '../workers-tree'
import { ChooseWorkersForm } from '../choose-workers-form'
import sendRequest from 'utils/send-request'
import { CreateWorker } from '../create-worker'

// TODO: Анонсы. Портфолио таблицей как на хомяке Далера
// TODO: Анонсы. Показать людей, с которыми работал
// TODO: Анонсы. Взаимосвязи людей на графе

const onSubmit = values => {
	console.log('onSubmit', values)
	// sendRequest('/api/v1/project/worker' + (!!values.id ? `/${values.id}` : ''), {
	// 	method: 'POST',
	// 	values,
	// }).then(data => console.log(data))
}

export const WorkerInput = ({ projectId }) => {
	const [ workers, fetchWorkers ] = useApi<WorkerType>(API_ROUTE.projectWorker)

	const [ chooseWorker, setChooseWorker ] = useState<WorkerType[]>([])
	const handleClickChose = (worker: WorkerType) => setChooseWorker(prev => [...prev, worker])
	const handleRemoveChose = (worker: WorkerType) => setChooseWorker(prev => prev.filter(i => i.id !== worker.id))

	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(workers.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === workers.status && !workers.data.length) {
		return <NotFoundData />
	}

	return (
		<div className="worker-input">
			<CollapseSection fold={true} header="Добавить участников анонса">
				<WorkersTree
					workers={workers.data}
					onWorkerSelect={handleClickChose}
				/>
				<ChooseWorkersForm
					workers={chooseWorker}
					onRemoveWorker={handleRemoveChose}
					onSubmit={async (data) => {
						let results = Object.entries(data).map(async ([workerId, role]) => {
							return await sendRequest('/api/v1/project/credits', {
								method: 'POST',
								values: {
									project: projectId,
									worker: workerId,
									role: role,
								}
							})
						})
						const few = await Promise.all(results)
						const res = few.reduce((acc, singleRes) => acc && singleRes > 0, true)
						if (res) {
							setChooseWorker([])
						}
						return res
					}}
				/>
				<CreateWorker
					onSubmit={async (data) => {
						const res = await sendRequest('/api/v1/project/worker', {
							method: 'POST',
							values: data
						})
						if (res > 0) {
							fetchWorkers()
							return true
						}
						return false
					}}
				/>
			</CollapseSection>
		</div>
	)
}
