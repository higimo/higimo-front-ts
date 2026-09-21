import { PortfolioProjectDetailType } from 'api-types/portfolio.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useApi } from 'hook/fetch/use-api'

import { API_ROUTE } from 'dic/API_ROUTE'

type UseProjectViewerType = (vendorCode: string, projectCode: string) => [PortfolioProjectDetailType, boolean, boolean]

/**
 * Вернёт дательную информацию по кейсу
 *
 * @param vendorCode код вендора
 * @param projectCode код проекта
 * @returns
*/
export const useProjectViewer: UseProjectViewerType = (vendorCode, projectCode) => {
	const [projectApi] = useApi<PortfolioProjectDetailType>(API_ROUTE.projectSingle({ vendorCode, projectCode }))
	const isLoadingApi = useLoadingState([projectApi.status])
	const isEmptyApi = useEmptyDataState(projectApi.data)

	const currentProjectApi = projectApi.data

	return [currentProjectApi, isLoadingApi, isEmptyApi]
}
