import { AccordRealTagType, AccordType } from 'api-types/accord.types'

import useApi from 'hook/use-api'
import { useMemo } from 'preact/hooks'

import { median } from 'utils/math/median'

import { TOTAL_TAGS } from 'components/accord/tags'
import { bard, funny, korol, lacky, liric, newschool, old, rap, scream, ussr } from 'components/accord/tags-mapping-ids'
import { API_ROUTE } from 'dic/API_ROUTE'

const NEWS_ACCORD_LENGTH = 30

export const useAccord = (): AccordRealTagType[] => {
	const [ accordUnsortList ] = useApi<AccordType[]>(API_ROUTE.accord)

	const accordList: AccordRealTagType[] = useMemo(() => {
		const firstTags = accordUnsortList.data.map(item => ({
				...item,
				tags: [ // MAIN
					...(liric.includes(item.id)     ? [{ id: 1, label: TOTAL_TAGS.liric}] : []),
					...(scream.includes(item.id)    ? [{ id: 2, label: TOTAL_TAGS.scream} ] : []),
					...(korol.includes(item.id)     ? [{ id: 3, label: TOTAL_TAGS.korol} ] : []),
					...(funny.includes(item.id)     ? [{ id: 4, label: TOTAL_TAGS.funny} ] : []),
					...(rap.includes(item.id)       ? [{ id: 5, label: TOTAL_TAGS.rap} ] : []),
					...(old.includes(item.id)       ? [{ id: 6, label: TOTAL_TAGS.old} ] : []),
					...(ussr.includes(item.id)      ? [{ id: 7, label: TOTAL_TAGS.ussr} ] : []),
					...(lacky.includes(item.id)     ? [{ id: 8, label: TOTAL_TAGS.lacky} ] : []),
					...(newschool.includes(item.id) ? [{ id: 9, label: TOTAL_TAGS.newschool} ] : []),
					...(bard.includes(item.id)      ? [{ id: 10, label: TOTAL_TAGS.bard} ] : []),
				]
			}))
			.sort((a, b) => a.name.localeCompare(b.name))

		const length = accordUnsortList.data.length
		const minimumViewed = median(accordUnsortList.data.map(i => i.view))

		return firstTags.map(item => {
			if (item.tags.length === 0) {
				item.tags.push({ id: 11, label: TOTAL_TAGS.nolist})
			}
			if (item.tags.length >= 3) {
				item.tags.push({ id: 12, label: TOTAL_TAGS.manylist})
			}
			if (item.id > length - NEWS_ACCORD_LENGTH) {
				item.tags.push({ id: 13, label: TOTAL_TAGS.new})
			}
			if (item.view > minimumViewed) {
				item.tags.push({ id: 14, label: TOTAL_TAGS.pop})
			}
			return item
		})
	}, [accordUnsortList.data])

	return accordList
}
