import { FunctionComponent } from 'preact'
import { NestedListItemFullType } from 'api-types/listlist.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import { useApi } from 'hook/fetch/use-api'

import { Loading } from 'components/ui/loading'
import { NestedList } from 'components/list/nested-list'

import { API_ROUTE } from 'dic/API_ROUTE'
import { NotFoundData } from 'components/ui/not-found-data/NotFoundData'

export const ListListIndexPage: FunctionComponent = () => {
	usePageTitle('Список списков')

	const { params: { idcode = '' } } = useRoute()

	const filter = (parseInt(idcode, 10) > 0
		? { id: idcode }
		: (idcode.length
			? { code: idcode }
			: {}
		)
	)

	const [ nestedListItems ] = useApi<NestedListItemFullType[]>(API_ROUTE.lister, {
		filter,
		withParent: 'true',
		withChild: 'true',
		withProps: 'true',
	})
	const isLoading = useLoadingState([nestedListItems.status])
	const isListEmpty = useEmptyDataState(nestedListItems.data)

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="list-list">
			{(isListEmpty
				? <NotFoundData />
				: <NestedList
					nestedList={nestedListItems.data}
				/>
			)}
		</div>
	)
}
