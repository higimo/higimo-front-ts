import { DataItemWithTags } from 'utils/filter-tag-strategy/types'
import { TagName } from './use-smart-tags'

import { useMemo } from 'preact/hooks'

// TODO: [MEDIUM] см. useYearFilter(AND_GROUP_STRATEGY)
// TODO: [MEDIUM] см. filterTagAndGroupsStrategy
export const useFilterByTags = <T extends DataItemWithTags>(
	list: T[],
	selectedIds: Set<TagName>,
	mode: 'any' | 'all' = 'any' // any - хотя бы один тег, all - все теги
): T[] => {
	return useMemo(() => {
		// Если нет выбранных тегов, возвращаем все элементы
		if (selectedIds.size === 0) {
			return list
		}

		return list.filter(item => {
			for (const selectedTag of Array.from(selectedIds)) {
				for (const itemTag of item.tags) {
					if (itemTag.title === selectedTag) {
						return true
					}
				}
			}
			return false
		})
	}, [list, selectedIds, mode])
}
