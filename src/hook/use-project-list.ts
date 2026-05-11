import { PortfolioProjectFullType, PortfolioGroupedTagType } from 'api-types/portfolio.types'

import { PROJECT_FILTER_DIC } from 'components/project/project-tag-category/types'

import { useEmptyDataState } from './use-empty-data-state'
import { useLoadingState } from './use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from './use-api'

import { API_ROUTE } from 'dic/API_ROUTE'
import { useSmartTags } from './tags/use-smart-tags'

type UseProjectType = () => {
    isLoading: boolean
    isEmpty: boolean
    projectList: PortfolioProjectFullType[]
    tagList: PortfolioGroupedTagType[]
}
/**
 * Вернёт список проектов
 */
export const useProjectList: UseProjectType = () => {
	const { query } = useRoute()

	const [projectList] = useApi<PortfolioProjectFullType[]>(API_ROUTE.projectProject)
	const [tagList] = useApi<PortfolioGroupedTagType[]>(API_ROUTE.projectGroupedTags)
	const isLoading = useLoadingState([projectList.status, tagList.status])
	const isProjectListEmpty = useEmptyDataState(projectList.data)
	const isTagListEmpty = useEmptyDataState(tagList.data)

	let filterProjectList = projectList.data
	if (query[PROJECT_FILTER_DIC.FILTER_TAG]) {
		filterProjectList = projectList.data.filter(projectItem => {
			return projectItem.tags.some(tag => tag.title === query[PROJECT_FILTER_DIC.FILTER_TAG])
		})
	}

	return {
		isLoading: isLoading,
		isEmpty: isProjectListEmpty || isTagListEmpty,
		projectList: filterProjectList,
		tagList: tagList.data,
	}
}
