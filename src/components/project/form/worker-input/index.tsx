import { HigimoApiError } from 'errors/higimo-api-error'
import { FunctionComponent } from 'preact'
import { PortfolioProjectId, PortfolioWorkerType } from 'api-types/portfolio.types'

import { useApi } from 'hook/fetch/use-api'
import { useState } from 'preact/hooks'

import { ChooseWorkersForm } from 'components/project/form/choose-workers-form'
import { CollapseSection } from 'components/ui/collapse-section'
import { WorkerForm } from 'components/project/form/worker-form'
import { EmptyData } from 'components/ui/empty-data'
import { LoadSuspense } from 'components/ui/load-suspense'
import { WorkersTree } from 'components/project/form/workers-tree'

import { API_ROUTE } from 'dic/route/API_ROUTE'

import { sendRequest } from 'utils/api/send-request'
import { toast } from 'toast'
import { isObject } from 'utils/types/is-object'
import { as } from 'utils/types/as'

// TODO: [FEATURE_PORTFOLIO] Анонсы. Портфолио таблицей как на хомяке Далера
// https://aliyorov.com/projects/
// TODO: [FEATURE_PORTFOLIO] Анонсы. Показать людей, с которыми работал
// TODO: [FEATURE_PORTFOLIO] Анонсы. Взаимосвязи людей на графе
// TODO: [FEATURE_PORTFOLIO] пора переписать все формы на сайте

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
			const results = promisesAll.reduce((acc, singleRes) => acc && isObject(singleRes.data), true)
			if (!results) {
				toast.error('Неверный формат ответа сервера')
				setChooseWorker([])
			}
			return results
		} catch (error) {
			const apiError = error as HigimoApiError
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
			if (as<PortfolioWorkerType>(result, ['id', 'full_name', 'login'])) {
				fetchWorkerList()
				return true
			}
			toast.error('Неверный формат ответа сервера')
			return false
		} catch (error) {
			const apiError = error as HigimoApiError
			toast.error(apiError.message || 'Ошибка при создании пользователя')
			return false
		}
	}

	return (
		<div className="worker-input">
			<LoadSuspense data={workerList}>
				<EmptyData data={workerList}>
					<CollapseSection fold={!true} title="Добавить участников анонса">
						<div className="workers-tree">
							<h3>Выбрать человека</h3>
							<WorkersTree
								workers={workerList.data}
								onWorkerSelect={handleClickChoose}
							/>
						</div>
						<ChooseWorkersForm
							workers={chooseWorker}
							onRemoveWorker={handleRemoveChoose}
							onSubmit={handleSubmitAddWorker}
						/>
						<CollapseSection fold={!true} title="Добавить человека">
							<WorkerForm
								onSubmit={handleSubmitCreateWorker}
							/>
						</CollapseSection>
					</CollapseSection>
				</EmptyData>
			</LoadSuspense>
		</div>
	)
}
