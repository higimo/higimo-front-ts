import { PortfolioWorkerType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useState } from 'preact/hooks'
import useApi from 'hook/use-api'

import { ChooseWorkersForm } from 'components/form/project/choose-workers-form'
import { CollapseSection } from 'components/ui/collapse-section'
import { CreateWorker } from 'components/form/project/create-worker'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { WorkersTree } from 'components/form/project/workers-tree'

import { API_ROUTE } from 'dic/api-route'

import sendRequest from 'utils/send-request'

import './style.css'

// TODO: [LIGHT] Анонсы. Портфолио таблицей как на хомяке Далера
// TODO: [MEDIUM] Анонсы. Показать людей, с которыми работал
// TODO: [MEDIUM] Анонсы. Взаимосвязи людей на графе

const onSubmit = values => {
	console.log('onSubmit', values)
	// sendRequest(API_ROUTE.attachAuthor + (!!values.id ? `/${values.id}` : ''), {
	// 	method: 'POST',
	// 	values,
	// }).then(data => console.log(data))
}

export const WorkerInput = ({ projectId }) => {
	const [ workers, fetchWorkers ] = useApi<PortfolioWorkerType[]>(API_ROUTE.projectWorker)
	const [ chooseWorker, setChooseWorker ] = useState<PortfolioWorkerType[]>([])
	const isLoading = useLoadingState([workers.status])
	const isListEmpty = useEmptyDataState(workers.data)

	const handleClickChose = (worker: PortfolioWorkerType) => setChooseWorker(prev => [...prev, worker])
	const handleRemoveChose = (worker: PortfolioWorkerType) => setChooseWorker(prev => prev.filter(i => i.id !== worker.id))

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
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
							return await sendRequest(API_ROUTE.attachAuthor_BAD_WAY, {
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
						const res = await sendRequest(API_ROUTE.attachAuthor, {
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
