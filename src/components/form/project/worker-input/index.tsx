import { FunctionComponent } from 'preact'
import { PortfolioProjectId, PortfolioWorkerType } from 'api-types/portfolio.types'

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

import { API_ROUTE } from 'dic/API_ROUTE'

import sendRequest, { ApiError } from 'utils/api/send-request'
import { toast } from 'toast'

import './style.css'

// TODO: [FEATURE] Анонсы. Портфолио таблицей как на хомяке Далера
// TODO: [FEATURE] Анонсы. Показать людей, с которыми работал
// TODO: [FEATURE] Анонсы. Взаимосвязи людей на графе
// TODO: [FEATURE] пора переписать все формы на сайте

type WorkerInputPropsType = {
	projectId: PortfolioProjectId
}

export const WorkerInput: FunctionComponent<WorkerInputPropsType> = ({ projectId }) => {
	const [ workers, fetchWorkers ] = useApi<PortfolioWorkerType[]>(API_ROUTE.projectWorker)
	const [ chooseWorker, setChooseWorker ] = useState<PortfolioWorkerType[]>([])
	const isLoading = useLoadingState([workers.status])
	const isListEmpty = useEmptyDataState(workers.data)

	const handleClickChose = (worker: PortfolioWorkerType) => setChooseWorker(prev => prev.concat([worker]))
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
						try {
							const sendings = Object.entries(data).map(async ([workerId, role]) => {
								return await sendRequest(API_ROUTE.attachAuthor_BAD_WAY, {
									method: 'POST',
									values: {
										project: projectId,
										worker: workerId,
										role: role,
									}
								})
							})
							const promisesAll = await Promise.all(sendings)
							const results = promisesAll.reduce((acc, singleRes) => acc && singleRes.data > 0, true)
							if (results) {
								toast.error('Неверный формат ответа сервера')
								setChooseWorker([])
							}
							return results
						} catch (error) {
							const apiError = error as ApiError
							toast.error(apiError.message || 'Не получилось прикрепить автора ')
							return false
						}
					}}
				/>
				<CreateWorker
					onSubmit={async (data) => {
						try {
							const { data: result } = await sendRequest(API_ROUTE.attachAuthor, {
								method: 'POST',
								values: data
							})
							if (result > 0) {
								fetchWorkers()
								return true
							}
							toast.error('Неверный формат ответа сервера')
							return false
						} catch (error) {
							const apiError = error as ApiError
							toast.error(apiError.message || 'Ошибка при создании пользователя')
							return false
						}
					}}
				/>
			</CollapseSection>
		</div>
	)
}
