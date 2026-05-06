import { AccordModeType, AccordType } from 'api-types/accord.types'

import useApi from 'hook/use-api'

import { filterMapping, median } from 'components/accord/utils'

import { API_ROUTE } from 'dic/api-route'

const NEWS_ACCORD_LENGTH = 30

export const useAccord = (filter: string = ''): AccordModeType[] => {
	const [ accordUnsortList ] = useApi<AccordType[]>(API_ROUTE.accord)

	const length = accordUnsortList.data.length
	const minimumViewed = median(accordUnsortList.data.map(i => i.view))

	const isNew = (id: AccordType['id']) => id > length - NEWS_ACCORD_LENGTH
	const isMostView = (count: AccordType['view']) => count > minimumViewed

	let newList: AccordModeType[] = accordUnsortList.data.map(item => ({
		...item,
		isNew: isNew(item.id),
		isMostView: isMostView(item.view),
	}))

	newList = newList.filter(filterMapping[filter])
		.sort((a, b) => a.name.localeCompare(b.name))

	return newList
}
