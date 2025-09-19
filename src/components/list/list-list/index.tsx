import { useRoute } from "preact-iso"

import { Loading } from 'components/ui/loading'
import { API_ROUTE } from "dic/api-route"
import { NotFoundData } from "components/ui/not-found-data"
import useApi, { API_STATUS } from "hook/use-api"
import { ListerItem } from "types"
import { ListListElement } from "../list-list-element"
import { convertFlatListToIerah } from "../utils"

export const ListList = () => {
	const { params: { idcode = '' } } = useRoute()
	const [ listlistList ] = useApi<ListerItem>(API_ROUTE.lister, {
		withChild: 'true',
		filter: {
			id: idcode,
			code: idcode,
		},
	})
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(listlistList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === listlistList.status && !listlistList.data.length) {
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
