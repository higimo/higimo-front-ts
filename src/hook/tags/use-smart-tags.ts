// use-smart-tags.ts
import { useState, useCallback, useMemo } from 'preact/hooks'

export type TagName = string

export type Tag = {
	id: number
	label: TagName
}

export type TagCategory = {
	id: string
	label: string
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
	isSelected: (id: TagName) => boolean
	isCategoryAllSelected: (categoryId: string) => boolean
	getCategorySelectedCount: (categoryId: string) => { selected: number; total: number }

	// Действия с отдельными тегами
	toggleTag: (id: TagName) => () => void
	select: (id: TagName) => void
	deselect: (id: TagName) => void

	// Действия с категориями
	selectAllInCategory: (categoryId: string) => void
	deselectAllInCategory: (categoryId: string) => () => void
	toggleAllInCategory: (categoryId: string) => void

	// Глобальные действия
	selectAll: () => void
	deselectAll: () => void
	reset: () => void

	// Вспомогательные
	getTagsInCategory: (categoryId: string) => Tag[]
}

const getAllTagIds = (categories: TagCategory[]): TagName[] => {
	return categories.flatMap(cat => cat.tags.map(tag => tag.label))
}

const getCategoryTagIds = (categories: TagCategory[], categoryId: string): TagName[] => {
	const category = categories.find(cat => cat.id === categoryId)
	return category?.tags.map(tag => tag.label) || []
}

const getCategoryTags = (categories: TagCategory[], categoryId: string): Tag[] => {
	return categories.find(cat => cat.id === categoryId)?.tags || []
}

export const useSmartTags = ({
	categories,
	mode = 'multiple',
	initialSelected = [],
}: UseSmartTagsProps): UseSmartTagsReturn => {
	// Состояние
	const [selectedIds, setSelectedIds] = useState<Set<TagName>>(() => new Set(initialSelected))

	// Мемоизированные значения
	const allTagIds = useMemo(() => getAllTagIds(categories), [categories])
	const totalCount = useMemo(() => allTagIds.length, [allTagIds])

	// Базовые операции
	const select = useCallback((id: TagName) => {
		setSelectedIds(prev => {
			if (mode === 'single') {
				return new Set([id])
			}
			const next = new Set(prev)
			next.add(id)
			return next
		})
	}, [mode])

	const deselect = useCallback((id: TagName) => {
		setSelectedIds(prev => {
			const next = new Set(prev)
			next.delete(id)
			return next
		})
	}, [])

	const toggleTag = useCallback((id: TagName) => () => {
		if (selectedIds.has(id)) {
			deselect(id)
		} else {
			select(id)
		}
	}, [selectedIds, select, deselect])

	const isSelected = useCallback((id: TagName) => {
		return selectedIds.has(id)
	}, [selectedIds])

	// Действия с категориями
	const selectAllInCategory = useCallback((categoryId: string) => {
		const tagIds = getCategoryTagIds(categories, categoryId)
		setSelectedIds(prev => new Set([...prev, ...tagIds]))
	}, [categories])

	const deselectAllInCategory = useCallback((categoryId: string) => () => {
		const tagIds = getCategoryTagIds(categories, categoryId)
		setSelectedIds(prev => {
			const next = new Set(prev)
			tagIds.forEach(id => next.delete(id))
			return next
		})
	}, [categories])

	const toggleAllInCategory = useCallback((categoryId: string) => {
		const isAllSelected = isCategoryAllSelected(categoryId)
		if (isAllSelected) {
			deselectAllInCategory(categoryId)
		} else {
			selectAllInCategory(categoryId)
		}
	}, [categories, selectAllInCategory, deselectAllInCategory])

	const isCategoryAllSelected = useCallback((categoryId: string) => {
		const tagIds = getCategoryTagIds(categories, categoryId)
		if (tagIds.length === 0) return false
		return tagIds.every(id => selectedIds.has(id))
	}, [categories, selectedIds])

	const getCategorySelectedCount = useCallback((categoryId: string) => {
		const tagIds = getCategoryTagIds(categories, categoryId)
		const selected = tagIds.filter(id => selectedIds.has(id)).length
		return { selected, total: tagIds.length }
	}, [categories, selectedIds])

	const getTagsInCategory = useCallback((categoryId: string) => {
		return getCategoryTags(categories, categoryId)
	}, [categories])

	// Глобальные действия
	const selectAll = useCallback(() => {
		setSelectedIds(new Set(allTagIds))
	}, [allTagIds])

	const deselectAll = useCallback(() => {
		setSelectedIds(new Set())
	}, [])

	const reset = useCallback(() => {
		setSelectedIds(new Set(initialSelected))
	}, [initialSelected])

	// Вычисляемые значения
	const selectedCount = useMemo(() => selectedIds.size, [selectedIds])

	return {
		// Состояние
		selectedIds,
		selectedCount,
		totalCount,

		// Проверка
		isSelected,
		isCategoryAllSelected,
		getCategorySelectedCount,

		// Действия с отдельными тегами
		toggleTag,
		select,
		deselect,

		// Действия с категориями
		selectAllInCategory,
		deselectAllInCategory,
		toggleAllInCategory,

		// Глобальные действия
		selectAll,
		deselectAll,
		reset,

		// Вспомогательные
		getTagsInCategory,
	}
}
