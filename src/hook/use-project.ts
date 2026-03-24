import { PortfolioProjectType, PortfolioGroupedTagType } from 'types'

import { PROJECT_FILTER_DIC } from 'components/project/project-tag-category/dic'

import { useEmptyDataState } from './use-empty-data-state'
import { useLoadingState } from './use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from './use-api'

import { API_ROUTE } from 'dic/api-route'

type UseProjectType = () => {
    isLoading: boolean
    isEmpty: boolean
    projectList: PortfolioProjectType[]
    tagList: PortfolioGroupedTagType[]
}
/**
 * Вернёт список проектов
 */
export const useProject: UseProjectType = () => {
	const { query } = useRoute()

	const [projectListRaw] = useApi<PortfolioProjectType[]>(API_ROUTE.projectProject)
	const [tagList] = useApi<PortfolioGroupedTagType[]>(API_ROUTE.projectGroupedTags)
	const isLoading = useLoadingState([projectListRaw.status, tagList.status])
	const isProjectListEmpty = useEmptyDataState(projectListRaw.data)
	const isTagListEmpty = useEmptyDataState(tagList.data)

	// TODO: useTag применить
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
