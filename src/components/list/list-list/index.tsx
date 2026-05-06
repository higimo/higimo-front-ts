import { ListerItem } from 'api-types/listlist.types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import { useRoute } from 'preact-iso'
import useApi from 'hook/use-api'

import { ListListElement } from 'components/list/list-list-element'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/api-route'

export const ListList = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ listlistList ] = useApi<ListerItem[]>(API_ROUTE.lister, {
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
