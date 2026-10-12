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
	if (selectedIds.has('Все')) {
		return true
	}

	if (isChooseVisitedMode(VISITED_MAP.VISITED) && 'visited' in item && !item.visited) {
		return false
	}
	if (isChooseVisitedMode(VISITED_MAP.WANTED) && 'visited' in item && !item.visited) {
		return false
	}

	if (selectedIds.has('Россия') || selectedIds.has('Иностранное')) {
		if ('country' in item) {
			if (selectedIds.has('Россия') && item.country !== 'Россия') {
				return false
			} else if (selectedIds.has('Иностранное') && item.country === 'Россия') {
				return false
			} else {
				return true
			}
		} else {
			return false
		}
	}

	for (const selectedTagTitle of selectedIds.values()) {
		const povTypeArray = TAG_NAME_POI_TYPE_MAPPING[selectedTagTitle as typeof TAGS_NAME[number]]
		if (!povTypeArray.includes(item.type)) {
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
