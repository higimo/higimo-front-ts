import { useRoute } from 'preact-iso'
import { ListerItem } from 'types'

import useApi from 'hook/use-api'
import { useLoadingState } from 'hook/use-loading-state'
import { useEmptyDataState } from 'hook/use-empty-data-state'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { ListListElement } from 'components/list/list-list-element'

import { convertFlatListToIerah } from 'components/list/utils'

import { API_ROUTE } from 'dic/api-route'

export const ListList = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ listlistList ] = useApi<ListerItem>(API_ROUTE.lister, {
		withChild: 'true',
		filter: {
			id: idcode,
			code: idcode,
		},
	})
	const isLoading = useLoadingState([listlistList.status])
	const isListEmpty = useEmptyDataState(listlistList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	const arr = convertFlatListToIerah(listlistList.data)
	const parent = arr.filter(i => !i.parent)

	return (
		<div className="list-list">
			{parent.map((item, iter) => (
				<ListListElement key={iter} {...item} />
			))}
		</div>
	)
}
