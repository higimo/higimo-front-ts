import { useCallback, useState } from 'preact/hooks'

type UseTagsType = <T,>(initialValue: T[]) => [T[], (newTagsList: T[]) => () => void]

/**
 * Работает с множественным выбором тегов, осторожно, когда не надо это — надо доработать хук
 */
export const useTags: UseTagsType = <T,>(initialValue: T[]): [T[], (newTagsList: T[]) => () => void] => {
	const [selectedTags, setSelectedTags] = useState<T[]>(initialValue)

	const handleTagClick = useCallback((newTagsList: T[]) => () => {
		console.log('hig',newTagsList)
		if (newTagsList.length === 0) {
			setSelectedTags([])
			return
		}
		// Если много элементов — применяем как есть
		if (newTagsList.length > 1) {
			setSelectedTags(newTagsList)
			return
		}
		// Если один элемент: убираем, если есть в массиве, добавляем, если отсутствует
		const year = newTagsList[0]
		let newTagsSet = selectedTags.includes(year)
			? selectedTags.filter(y => y !== year)
			: [...selectedTags, year]
			setSelectedTags(newTagsSet)
	}, [setSelectedTags, selectedTags])

	return [
		selectedTags,
		handleTagClick,
	]
}