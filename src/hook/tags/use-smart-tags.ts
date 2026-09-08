// use-smart-tags.ts
import { useState, useCallback, useMemo } from 'preact/hooks'

export type TagName = string
export type CategoryName = string

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
	selectedTagTitles: Set<TagName>
	selectedCount: number
	totalCount: number

	// Проверка
	isSelected: (tagName: TagName) => boolean
	isCategoryAllSelected: (categoryTitle: CategoryName) => boolean
	getCategorySelectedCount: (categoryTitle: CategoryName) => { selected: number; total: number }

	// Действия с отдельными тегами
	toggleTag: (tagName: TagName) => () => void
	select: (tagName: TagName) => void
	deselect: (tagName: TagName) => void

	// Действия с категориями
	selectAllInCategory: (categoryTitle: CategoryName) => void
	deselectAllInCategory: (categoryTitle: CategoryName) => void
	toggleAllInCategory: (categoryTitle: CategoryName) => () => void

	// Глобальные действия
	selectAll: () => void
	deselectAll: () => void
	reset: () => void

	// Вспомогательные
	getTagsInCategory: (categoryTitle: CategoryName) => Tag[]
}

const getAllTagIds = (categories: TagCategory[]): TagName[] => {
	return categories.flatMap(cat => cat.tags.map(tag => tag.title))
}

const getCategoryTagTitles = (categories: TagCategory[], categoryTitle: CategoryName): TagName[] => {
	const category = categories.find(cat => cat.group.title === categoryTitle)
	return category?.tags.map(tag => tag.title) || []
}

const getCategoryTags = (categories: TagCategory[], categoryTitle: CategoryName): Tag[] => {
	return categories.find(cat => cat.group.title === categoryTitle)?.tags || []
}

export const useSmartTags = ({
	categories,
	mode = 'multiple',
	initialSelected = [],
}: UseSmartTagsProps): UseSmartTagsReturn => {
	const [selectedTagTitles, setSelectedTagTitles] = useState<Set<TagName>>(() => new Set(initialSelected))


	const allTagTitles = useMemo(() => getAllTagIds(categories), [categories])
	const totalCount = useMemo(() => allTagTitles.length, [allTagTitles])


	const select = useCallback((tagName: TagName) => {
		setSelectedTagTitles(prev => {
			if (mode === 'single') {
				return new Set([tagName])
			}
			const next = new Set(prev)
			next.add(tagName)
			return next
		})
	}, [mode])

	const deselect = useCallback((tagName: TagName) => {
		setSelectedTagTitles(prev => {
			const next = new Set(prev)
			next.delete(tagName)
			return next
		})
	}, [])

	const toggleTag = useCallback((tagName: TagName) => () => {
		if (selectedTagTitles.has(tagName)) {
			deselect(tagName)
		} else {
			select(tagName)
		}
	}, [selectedTagTitles, select, deselect])

	const isSelected = useCallback((tagName: TagName) => {
		return selectedTagTitles.has(tagName)
	}, [selectedTagTitles])



	const isCategoryAllSelected = useCallback((categoryTitle: CategoryName) => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		if (tagTitles.length === 0) return false
		return tagTitles.every(id => selectedTagTitles.has(id))
	}, [categories, selectedTagTitles])

	const selectAllInCategory = useCallback((categoryTitle: CategoryName) => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		setSelectedTagTitles(prev => new Set(Array.from(prev).concat(tagTitles)))
	}, [categories])

	const deselectAllInCategory = useCallback((categoryTitle: CategoryName) => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		setSelectedTagTitles(prev => {
			const next = new Set(prev)
			tagTitles.forEach(tagName => next.delete(tagName))
			return next
		})
	}, [categories])

	const toggleAllInCategory = useCallback((categoryTitle: CategoryName) => () => {
		const isAllSelected = isCategoryAllSelected(categoryTitle)
		if (isAllSelected) {
			deselectAllInCategory(categoryTitle)
		} else {
			selectAllInCategory(categoryTitle)
		}
	}, [categories, isCategoryAllSelected, deselectAllInCategory, selectAllInCategory])

	const getCategorySelectedCount = useCallback((categoryTitle: CategoryName) => {
		const tagTitles = getCategoryTagTitles(categories, categoryTitle)
		const selected = tagTitles.filter(id => selectedTagTitles.has(id)).length
		return { selected, total: tagTitles.length }
	}, [categories, selectedTagTitles])

	const getTagsInCategory = useCallback((categoryTitle: CategoryName) => {
		return getCategoryTags(categories, categoryTitle)
	}, [categories])


	const selectAll = useCallback(() => {
		setSelectedTagTitles(new Set(allTagTitles))
	}, [allTagTitles])

	const deselectAll = useCallback(() => {
		setSelectedTagTitles(new Set())
	}, [])

	const reset = useCallback(() => {
		setSelectedTagTitles(new Set(initialSelected))
	}, [initialSelected])


	const selectedCount = useMemo(() => selectedTagTitles.size, [selectedTagTitles])


	return {
		selectedTagTitles,
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
