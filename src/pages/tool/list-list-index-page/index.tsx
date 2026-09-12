import { FunctionComponent } from 'preact'
import { NestedListItem } from 'api-types/listlist.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import useApi from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NestedList } from 'components/list/nested-list'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ListListIndexPage: FunctionComponent = () => {
	usePageTitle('Список списков')

	const { params: { idcode = '' } } = useRoute()
	const [ nestedListItems ] = useApi<NestedListItem[]>(API_ROUTE.lister, {
		filter: {
			id: idcode,
		},
		withParent: 'true',
		withChild: 'true',
		withProps: 'true',
	})
	const isLoading = useLoadingState([nestedListItems.status])
	const isListEmpty = useEmptyDataState(nestedListItems.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="list-list">
			<NestedList nestedList={nestedListItems.data} />
		</div>
	)
}
