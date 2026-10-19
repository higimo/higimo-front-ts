import { PoiType } from 'api-types/tourism.types'
import { TORUSM_SORT_MAP } from 'dic/tourism/TORUSM_SORT_MAP'
import { ValueOf } from 'utils.type'


export const handleMapSort = (isChooseSortMode: (value: ValueOf<typeof TORUSM_SORT_MAP>) => boolean) => (a: PoiType, b: PoiType) => {
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
