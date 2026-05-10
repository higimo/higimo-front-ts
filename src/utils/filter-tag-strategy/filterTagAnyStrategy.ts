import { DataItemWithTags, SelectedTags } from './types'

/**
 * Стратегия "Любой тег" (OR по всем выбранным тегам).
 *
 * Объединяет все выбранные теги из всех групп в один плоский список.
 * Элемент считается подходящим, если содержит хотя бы один из выбранных тегов.
 * Если выбранных тегов нет — показывает пустоту
 *
 * ### Использование
 * ```ts
 * const filteredData = useMemo(
 *     () => filterTagAnyStrategy(stateData.barPovMoscow, selectedTags),
 *     [stateData.barPovMoscow, selectedTags]
 * );
 * ```
 *
 * @param data - Массив элементов с полем `tags: string[]`.
 * @param selectedTags - Объект, где ключ — группа, значение — Set выбранных тегов.
 * @returns Отфильтрованный массив.
 */
export const filterTagAnyStrategy = <T extends DataItemWithTags>(
	data: T[],
	selectedTags: SelectedTags
): T[] => {
	const selectedFlat = Object.values(selectedTags).flatMap(set => Array.from(set));

	if (selectedFlat.length === 0) {
		return [];
	}

	return data.filter(item => {
		const itemTagsSet = new Set(item.tags);
		return selectedFlat.some(tag => itemTagsSet.has(tag));
	});
};
