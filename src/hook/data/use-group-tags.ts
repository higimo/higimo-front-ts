import { useCallback, useState } from 'preact/hooks'

// TODO: unused

export const TAG_GROUP_ALL_DISABLE = 'TAG_GROUP_ALL_DISABLE'
export const TAG_GROUP_ALL_ENABLE = 'TAG_GROUP_ALL_ENABLE'

type UseGroupTagsReturnType = {
	selectedTags: Record<string, Set<string>>
	toggleTag: (group: string, tag: string) => void
	selectAll: (group: string) => void
	deselectAll: (group: string) => void
	isAllSelected: (group: string) => boolean
	isNoneSelected: (group: string) => boolean
}

export const useGroupTags = (tagGroups: Record<string, string[]>, initialSelected?: Record<string, Set<string>>): UseGroupTagsReturnType => {
	const [selectedTags, setSelectedTags] = useState<Record<string, Set<string>>>(() => {
		if (initialSelected) {
			return initialSelected
		}
		const init: Record<string, Set<string>> = {}

		for (const group of Object.keys(tagGroups)) {
			init[group] = new Set(tagGroups[group])
		}
		return init
	})

	const getRealTags = useCallback((group: string) => {
		return tagGroups[group]?.filter(tag => tag !== TAG_GROUP_ALL_DISABLE && tag !== TAG_GROUP_ALL_ENABLE) ?? []
	}, [tagGroups])

	const isAllSelected = useCallback((group: string) => {
		const realTags = getRealTags(group)
		if (realTags.length === 0) {
			return false
		}
		const selected = selectedTags[group] ?? new Set()
		return realTags.every(tag => selected.has(tag))
	}, [selectedTags, getRealTags])

	const isNoneSelected = useCallback((group: string) => {
		const realTags = getRealTags(group)
		const selected = selectedTags[group] ?? new Set()
		return realTags.every(tag => !selected.has(tag))
	}, [selectedTags, getRealTags])

	const toggleTag = useCallback((group: string, tag: string) => {
		if (tag === TAG_GROUP_ALL_DISABLE || tag === TAG_GROUP_ALL_ENABLE) {
			return
		}
		setSelectedTags(prev => {
			const groupSet = prev[group] ? new Set(prev[group]) : new Set()
			if (groupSet.has(tag)) {
				groupSet.delete(tag)
			} else {
				groupSet.add(tag)
			}
			return ({ ...prev, [group]: groupSet } as Record<string, Set<string>>)
		})
	}, [])

	const selectAll = useCallback((group: string) => {
		const realTags = getRealTags(group)
		setSelectedTags(prev => ({
			...prev,
			[group]: new Set(realTags),
		}))
	}, [getRealTags])

	const deselectAll = useCallback((group: string) => {
		setSelectedTags(prev => ({
			...prev,
			[group]: new Set(),
		}))
	}, [])

	return {
		selectedTags,
		toggleTag,
		selectAll,
		deselectAll,
		isAllSelected,
		isNoneSelected,
	}
}
