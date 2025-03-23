import { ListerItem } from "../../../types"

import { useRoute } from "preact-iso"
import useApi, { API_STATUS } from "../../../hook/use-api"

import { convertFlatListToIerah } from "../utils"

import { ListListElement } from "../list-list-element"
import { Loading } from "../../accord/accord-single"
import { NotFoundData } from "../../ui/not-found-data"

import { API_ROUTE } from "../../../api-route"

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
