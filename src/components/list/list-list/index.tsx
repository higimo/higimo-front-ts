import { NestedListItem } from 'api-types/listlist.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from 'hook/fetch/use-api'

import { ListListElement } from 'components/list/list-list-element'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/API_ROUTE'

export const ListList = () => {
	// TODO: [LIGHT] перенести в page
	const { params: { idcode = '' } } = useRoute()
	const [ listlistList ] = useApi<NestedListItem[]>(API_ROUTE.lister, {
		filter: {
			id: idcode,
		},
		withParent: 'true',
		withChild: 'true',
		withProps: 'true',
	})
	const isLoading = useLoadingState([listlistList.status])
	const isListEmpty = useEmptyDataState(listlistList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="list-list">
			{listlistList.data.map((item, iter) => (
				<ListListElement key={iter} listItem={item} />
			))}
		</div>
	)
}
