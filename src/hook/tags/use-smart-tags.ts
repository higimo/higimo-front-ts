// use-smart-tags.ts
import { useState, useCallback, useMemo } from 'preact/hooks'

export type TagName = string
export type CatogoryName = string

export type Tag = {
	id: number
	title: TagName
}

export type TagGroup = {
	id: number
	title: string
}

export type TagCategory = {
	group: TagGroup
	tags: Tag[]
}

type UseSmartTagsProps = {
	categories: TagCategory[]
	mode?: 'single' | 'multiple'
	initialSelected?: TagName[]
}

type UseSmartTagsReturn = {
	// Состояние
	selectedIds: Set<TagName>
	selectedCount: number
	totalCount: number

	// Проверка
	isSelected: (tagName: TagName) => boolean
	isCategoryAllSelected: (categoryTitle: CatogoryName) => boolean
	getCategorySelectedCount: (categoryTitle: CatogoryName) => { selected: number; total: number }

	// Действия с отдельными тегами
	toggleTag: (tagName: TagName) => () => void
	select: (tagName: TagName) => void
	deselect: (tagName: TagName) => void

	// Действия с категориями
	selectAllInCategory: (categoryTitle: CatogoryName) => void
	deselectAllInCategory: (categoryTitle: CatogoryName) => () => void
	toggleAllInCategory: (categoryTitle: CatogoryName) => void

	// Глобальные действия
	selectAll: () => void
	deselectAll: () => void
	reset: () => void

	// Вспомогательные
	getTagsInCategory: (categoryTitle: CatogoryName) => Tag[]
}

const getAllTagIds = (categories: TagCategory[]): TagName[] => {
	return categories.flatMap(cat => cat.tags.map(tag => tag.title))
}

const getCategoryTagTitles = (categories: TagCategory[], categoryTitle: CatogoryName): TagName[] => {
	const category = categories.find(cat => cat.group.title === categoryTitle)
	return category?.tags.map(tag => tag.title) || []
}

const getCategoryTags = (categories: TagCategory[], categoryTitle: CatogoryName): Tag[] => {
	return categories.find(cat => cat.group.title === categoryTitle)?.tags || []
}

export const useSmartTags = ({
	categories,
	mode = 'multiple',
	initialSelected = [],
}: UseSmartTagsProps): UseSmartTagsReturn => {
	const [selectedTitles, setSelectedTitles] = useState<Set<TagName>>(() => new Set(initialSelected))


	const allTagTitles = useMemo(() => getAllTagIds(categories), [categories])
	const totalCount = useMemo(() => allTagTitles.length, [allTagTitles])


	const select = useCallback((tagName: TagName) => {
		setSelectedTitles(prev => {
			if (mode === 'single') {
				return new Set([tagName])
			}
			const next = new Set(prev)
			next.add(tagName)
			return next
		})
	}, [mode])

	const deselect = useCallback((tagName: TagName) => {
		setSelectedTitles(prev => {
			const next = new Set(prev)
			next.delete(tagName)
			return next
		})
	}, [])

	const toggleTag = useCallback((tagName: TagName) => () => {
		if (selectedTitles.has(tagName)) {
			deselect(tagName)
		} else {
			select(tagName)
		}
	}, [selectedTitles, select, deselect])

	const isSelected = useCallback((tagName: TagName) => {
		return selectedTitles.has(tagName)
	}, [selectedTitles])


	const selectAllInCategory = useCallback((categoryTitle: CatogoryName) => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		setSelectedTitles(prev => new Set([...prev, ...tagTitles]))
	}, [categories])

	const deselectAllInCategory = useCallback((categoryTitle: CatogoryName) => () => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		setSelectedTitles(prev => {
			const next = new Set(prev)
			tagTitles.forEach(id => next.delete(id))
			return next
		})
	}, [categories])

	const toggleAllInCategory = useCallback((categoryTitle: CatogoryName) => {
		const isAllSelected = isCategoryAllSelected(categoryTitle)
		if (isAllSelected) {
			deselectAllInCategory(categoryTitle)
		} else {
			selectAllInCategory(categoryTitle)
		}
	}, [categories, selectAllInCategory, deselectAllInCategory])

	const isCategoryAllSelected = useCallback((categoryTitle: CatogoryName) => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		if (tagTitles.length === 0) return false
		return tagTitles.every(id => selectedTitles.has(id))
	}, [categories, selectedTitles])

	const getCategorySelectedCount = useCallback((categoryTitle: CatogoryName) => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		const selected = tagTitles.filter(id => selectedTitles.has(id)).length
		return { selected, total: tagTitles.length }
	}, [categories, selectedTitles])

	const getTagsInCategory = useCallback((categoryTitle: CatogoryName) => {
		return getCategoryTags(categories, categoryTitle)
	}, [categories])


	const selectAll = useCallback(() => {
		setSelectedTitles(new Set(allTagTitles))
	}, [allTagTitles])

	const deselectAll = useCallback(() => {
		setSelectedTitles(new Set())
	}, [])

	const reset = useCallback(() => {
		setSelectedTitles(new Set(initialSelected))
	}, [initialSelected])


	const selectedCount = useMemo(() => selectedTitles.size, [selectedTitles])


	return {
		selectedIds: selectedTitles,
		selectedCount,
		totalCount,

		isSelected,
		isCategoryAllSelected,
		getCategorySelectedCount,

		toggleTag,
		select,
		deselect,

		selectAllInCategory,
		deselectAllInCategory,
		toggleAllInCategory,

		selectAll,
		deselectAll,
		reset,

		getTagsInCategory,
	}
}
