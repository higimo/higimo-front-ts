import { NewProjectTag, NewProjectType } from 'types'
import { filterType } from 'components/project/project-tag-gallery/filter-type'

import { useRoute } from 'preact-iso'

import { API_ROUTE } from 'dic/api-route'
import useApi from './use-api'
import { useLoadingState } from './use-loading-state'
import { useEmptyDataState } from './use-empty-data-state'

type UseProjectType = () => {
    isLoading: boolean
    isEmpty: boolean
    projectList: NewProjectType[]
    tagList: NewProjectTag[]
}
/**
 * Вернёт список проектов
 */
export const useProject: UseProjectType = () => {
	const { query } = useRoute()

	const [projectListRaw] = useApi<NewProjectType>(API_ROUTE.projectProject)
	const [tagList] = useApi<NewProjectTag>(API_ROUTE.projectTags)
	const isLoading = useLoadingState([projectListRaw.status, tagList.status])
	const isProjectListEmpty = useEmptyDataState(projectListRaw.data)
	const isTagListEmpty = useEmptyDataState(tagList.data)

	let projectList = projectListRaw.data
	if (query[filterType.FILTER_TAG]) {
		projectList = projectListRaw.data.filter(projectItem => {
			return projectItem.tags.find(tag => tag.title === query[filterType.FILTER_TAG])
		})
	}

	return {
		isLoading: isLoading,
		isEmpty: isProjectListEmpty || isTagListEmpty,
		projectList,
		tagList: tagList.data,
	}
}