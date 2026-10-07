import { ApiError } from 'errors/higimo-api-error'
import { FunctionComponent } from 'preact'
import { PortfolioProjectId, PortfolioWorkerType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'
import { useState } from 'preact/hooks'

import { ChooseWorkersForm } from 'components/form/project/choose-workers-form'
import { CollapseSection } from 'components/ui/collapse-section'
import { WorkerForm } from 'components/form/project/worker-form'
import { EmptyData } from 'components/ui/empty-data'
import { LoadSuspense } from 'components/ui/load-suspense'
import { WorkersTree } from 'components/form/project/workers-tree'

import { API_ROUTE } from 'dic/API_ROUTE'

import { isDefined } from 'utils/types/is-defined'
import { sendRequest } from 'utils/api/send-request'
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
	const [ workerList, fetchWorkerList ] = useApi<PortfolioWorkerType[]>(API_ROUTE.projectWorker)
	const [ chooseWorker, setChooseWorker ] = useState<PortfolioWorkerType[]>([])

	const handleClickChoose = (worker: PortfolioWorkerType) => setChooseWorker(prev => prev.concat([worker]))
	const handleRemoveChoose = (worker: PortfolioWorkerType) => setChooseWorker(prev => prev.filter(i => i.id !== worker.id))

	const handleSubmitAddWorker = async (data: Record<PortfolioWorkerType['id'], string>) => {
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
			// TODO: [HARD] возможно, сменить на isObject
			const results = promisesAll.reduce((acc, singleRes) => acc && isDefined(singleRes.data), true)
			if (!results) {
				toast.error('Неверный формат ответа сервера')
				setChooseWorker([])
			}
			return results
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.message || 'Не получилось прикрепить автора ')
			return false
		}
	}

	const handleSubmitCreateWorker = async (data: PortfolioWorkerType) => {
		try {
			const { data: result } = await sendRequest<PortfolioWorkerType>(API_ROUTE.attachAuthor, {
				method: 'POST',
				values: data
			})
			// TODO: [HARD] вероятно, сменить на isObject или type guard на PortfolioWorkerType
			if (isDefined(result)) {
				fetchWorkerList()
				return true
			}
			toast.error('Неверный формат ответа сервера')
			return false
		} catch (error) {
			const apiError = error as ApiError
			toast.error(apiError.message || 'Ошибка при создании пользователя')
			return false
		}
	}

	return (
		<div className="worker-input">
			<LoadSuspense data={workerList}>
				<EmptyData data={workerList}>
					<CollapseSection fold={!true} header="Добавить участников анонса">
						<WorkersTree
							workers={workerList.data}
							onWorkerSelect={handleClickChoose}
						/>
						<ChooseWorkersForm
							workers={chooseWorker}
							onRemoveWorker={handleRemoveChoose}
							onSubmit={handleSubmitAddWorker}
						/>
						<WorkerForm
							onSubmit={handleSubmitCreateWorker}
						/>
					</CollapseSection>
				</EmptyData>
			</LoadSuspense>
		</div>
	)
}
