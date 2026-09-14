import { useCallback, useState } from 'preact/hooks'

type UseTagsType = <T,>(initialValue: T[]) => [T[], (newTagsList: T[]) => () => void]

// TODO: [USE_TAGS] useTags принимает только примитивы, сложные объекты не умеет обрабатывать,
// для этого кастомное сравнение надо пробрасывать
// TODO: [USE_TAGS] useTags поддерживать режим «только один выбранный» (радио-кнопка)

/**
 * Работает с множественным выбором тегов, осторожно, когда не надо это — надо доработать хук.
 * Возвращает текущий список выбранных элементов и функцию-обработчик, которая реализует логику
 * добавления/удаления тегов в зависимости от переданного массива.
 *
 * initialValue — начальный массив выбранных тегов
 *
 * ### Поддерживает сценарии
 * 1. Очистка всех тегов
 * 2. Передача выбранных тегов
 * 3. Включение тега
 * 4. Выключение тега
 *
 * ### Возвращает
 * * selectedTags – текущий массив выбранных тегов
 * * handleTagClick – функция клика на тег, обновляет состояние
 *
 * ### Как использовать
 * ```
 * const [ selectedYearTag, handleYearTagClick ] = useTags<number>([])
 *
 * handleYearTagClick(allTags)() // Выбрать все
 *
 * <Tag onClick={handleYearTagClick(tagName)}>{tagName}</Tag> // вкл/выкл конкретный
 * ```
 *
 * ### Алгоритм
 * 1. Хранит initialValue в useState
 * 2. Если `newTagsList.length === 0` — очистит выбранные теги
 * 3. Если `newTagsList.length > 1` — полностью заменит выбранные теги
 * 4. Если `newTagsList.length === 1` — уже существующий удалит, ещё не добавленный добавит
 */
export const useTags: UseTagsType = <T,>(initialValue: T[]): [T[], (newTagsList: T[]) => () => void] => {
	const [selectedTags, setSelectedTags] = useState<T[]>(initialValue)

	const handleTagClick = useCallback((newTagsList: T[]) => () => {
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
		let newTagsSet = selectedTags.includes(year!)
			? selectedTags.filter(y => y !== year)
			: selectedTags.concat([year!])
			setSelectedTags(newTagsSet)
	}, [setSelectedTags, selectedTags])

	return [
		selectedTags,
		handleTagClick,
	]
}
