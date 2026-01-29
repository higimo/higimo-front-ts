import { NewProjectType } from 'types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { API_ROUTE } from 'dic/api-route'

type UseProjectViewerType = (vendorCode: string, projectCode: string) => [NewProjectType, boolean, boolean]

/**
 * Вернёт дательную информацию по кейсу
 * @param vendorCode код вендора
 * @param projectCode код проекта
 * @returns 
*/
export const useProjectViewer: UseProjectViewerType = (vendorCode, projectCode) => {
    const [projectApi] = useApi<NewProjectType>(API_ROUTE.projectSingle({ vendorCode, projectCode }))
    const isLoadingApi = useLoadingState([projectApi.status])
    const isEmptyApi = useEmptyDataState(projectApi.data)

    const currentProjectApi = projectApi.data as unknown as NewProjectType

    return [currentProjectApi, isLoadingApi, isEmptyApi]
}