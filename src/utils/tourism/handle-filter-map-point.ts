import { PoiType } from 'api-types/tourism.types'
import { ValueOf } from 'utils.type'

import { TAG_NAME_POI_TYPE_MAPPING } from 'dic/tourism/TAG_NAME_POI_TYPE_MAPPING'
import { TAGS_NAME } from 'dic/tourism/TAGS_NAME'
import { TORUSM_SORT_MAP } from 'dic/tourism/TORUSM_SORT_MAP'
import { VISITED_MAP } from 'dic/tourism/VISITED_MAP'

type HandleFilterMapPointPropsType = {
	selectedIds: Set<string>
	isChooseVisitedMode: (val: ValueOf<typeof VISITED_MAP>) => boolean
}

export const handleFilterMapPoint = ({ selectedIds, isChooseVisitedMode }: HandleFilterMapPointPropsType) => (item: PoiType) => {
	const visited = 'visited' in item && item.visited

	if (isChooseVisitedMode(VISITED_MAP.VISITED) && !visited) {
		return false
	}
	if (isChooseVisitedMode(VISITED_MAP.WANTED) && visited) {
		return false
	}

	for (const id of selectedIds) {
		if (id === 'Все') {
			continue
		}

		if (id === 'Россия') {
			if (!('country' in item) || item.country !== 'Россия') {
				return false
			}
			continue
		}

		if (id === 'Иностранное') {
			if (!('country' in item) || item.country === 'Россия') {
				return false
			}
			continue
		}

		const types = TAG_NAME_POI_TYPE_MAPPING[id as typeof TAGS_NAME[number]]
		if (!types?.includes(item.type)) {
			return false
		}
	}

	return true
}

export const handleSort = (isChooseSortMode: (value: ValueOf<typeof TORUSM_SORT_MAP>) => boolean) => (a: PoiType, b: PoiType) => {
	if (isChooseSortMode(TORUSM_SORT_MAP.INIT)) {
		return 0
	}
	if (isChooseSortMode(TORUSM_SORT_MAP.VISITED)) {
		// @ts-ignore
		return b.visited - a.visited
	}
	if (isChooseSortMode(TORUSM_SORT_MAP.WANTED)) {
		// @ts-ignore
		return a.visited - b.visited
	}
	if (isChooseSortMode(TORUSM_SORT_MAP.ALPHABET)) {
		return a.title.localeCompare(b.title)
	}
	return 0
}
