import { PortfolioProjectFullType } from 'api-types/portfolio.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { API_ROUTE } from 'dic/api-route'

type UseProjectViewerType = (vendorCode: string, projectCode: string) => [PortfolioProjectFullType, boolean, boolean]

/**
 * Вернёт дательную информацию по кейсу
 * @param vendorCode код вендора
 * @param projectCode код проекта
 * @returns
*/
export const useProjectViewer: UseProjectViewerType = (vendorCode, projectCode) => {
    const [projectApi] = useApi<PortfolioProjectFullType>(API_ROUTE.projectSingle({ vendorCode, projectCode }))
    const isLoadingApi = useLoadingState([projectApi.status])
    const isEmptyApi = useEmptyDataState(projectApi.data)

    const currentProjectApi = projectApi.data

    return [currentProjectApi, isLoadingApi, isEmptyApi]
}
