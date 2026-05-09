import { AccordType, AccordRealTagType } from 'api-types/accord.types'

import useApi from 'hook/use-api'
import { useMemo } from 'preact/hooks'

import { median } from 'utils/math/median'

import { FILTER_TAG_MAPPING } from 'components/accord/utils'
import { API_ROUTE } from 'dic/api-route'
import { TOTAL_TAGS } from 'components/accord/tags'
import { liric, scream, korol, funny, rap, old, ussr, lacky, newschool, bard } from 'components/accord/tags-mapping-ids'

const NEWS_ACCORD_LENGTH = 30

export const useAccord = (filter: string = ''): AccordRealTagType[] => {
	const [ accordUnsortList ] = useApi<AccordType[]>(API_ROUTE.accord)

	const accordList: AccordRealTagType[] = useMemo(() => {
		const firstTags = accordUnsortList.data.map(item => ({
				...item,
				tags: [ // MAIN
					...(liric.includes(item.id)     ? [TOTAL_TAGS.liric] : []),
					...(scream.includes(item.id)    ? [TOTAL_TAGS.scream] : []),
					...(korol.includes(item.id)     ? [TOTAL_TAGS.korol] : []),
					...(funny.includes(item.id)     ? [TOTAL_TAGS.funny] : []),
					...(rap.includes(item.id)       ? [TOTAL_TAGS.rap] : []),
					...(old.includes(item.id)       ? [TOTAL_TAGS.old] : []),
					...(ussr.includes(item.id)      ? [TOTAL_TAGS.ussr] : []),
					...(lacky.includes(item.id)     ? [TOTAL_TAGS.lacky] : []),
					...(newschool.includes(item.id) ? [TOTAL_TAGS.newschool] : []),
					...(bard.includes(item.id)      ? [TOTAL_TAGS.bard] : []),
				]
			}))
			.sort((a, b) => a.name.localeCompare(b.name))

		const length = accordUnsortList.data.length
		const minimumViewed = median(accordUnsortList.data.map(i => i.view))

		return firstTags.map(item => {
			if (item.tags.length === 0) {
				item.tags.push(TOTAL_TAGS.nolist)
			}
			if (item.tags.length >= 3) {
				item.tags.push(TOTAL_TAGS.manylist)
			}
			if (item.id > length - NEWS_ACCORD_LENGTH) {
				item.tags.push(TOTAL_TAGS.new)
			}
			if (item.view > minimumViewed) {
				item.tags.push(TOTAL_TAGS.pop)
			}
			return item
		})
	}, [accordUnsortList.data])

	const filtredAccords = useMemo(() => {
		if (filter.length === 0) {
			return accordList
		}
		return accordList.filter(accord => accord.tags.includes(filter))
	}, [accordList, filter])

	return filtredAccords
}
