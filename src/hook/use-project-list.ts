import { PortfolioProjectFullType, PortfolioGroupedTagType } from 'api-types/portfolio.types'

import { PROJECT_FILTER_DIC } from 'components/project/project-tag-category/types'

import { useEmptyDataState } from './use-empty-data-state'
import { useLoadingState } from './use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from './use-api'

import { API_ROUTE } from 'dic/API_ROUTE'

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

	const [projectListRaw] = useApi<PortfolioProjectFullType[]>(API_ROUTE.projectProject)
	const [tagList] = useApi<PortfolioGroupedTagType[]>(API_ROUTE.projectGroupedTags)
	const isLoading = useLoadingState([projectListRaw.status, tagList.status])
	const isProjectListEmpty = useEmptyDataState(projectListRaw.data)
	const isTagListEmpty = useEmptyDataState(tagList.data)

	// TODO: [USE_TAGS] useTag применить
	let projectList = projectListRaw.data
	if (query[PROJECT_FILTER_DIC.FILTER_TAG]) {
		projectList = projectListRaw.data.filter(projectItem => {
			return projectItem.tags.find(tag => tag.title === query[PROJECT_FILTER_DIC.FILTER_TAG])
		})
	}

	return {
		isLoading: isLoading,
		isEmpty: isProjectListEmpty || isTagListEmpty,
		projectList,
		tagList: tagList.data,
	}
}
