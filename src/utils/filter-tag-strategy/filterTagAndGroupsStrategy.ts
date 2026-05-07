import { DataItemWithTags, SelectedTags } from "./types";

/**
 * Стратегия "AND между группами, OR внутри группы".
 *
 * Элемент должен содержать хотя бы один тег из каждой группы, в которой есть выбранные теги.
 * Группы без выбранных тегов игнорируются.
 *
 * ### Использование
 * ```ts
 * const filteredData = useMemo(
 *     () => filterTagAndGroupsStrategy(stateData.barPovMoscow, selectedTags),
 *     [stateData.barPovMoscow, selectedTags]
 * );
 * ```
 *
 * @param data - Массив элементов с полем `tags: string[]`.
 * @param selectedTags - Объект, где ключ — группа, значение — Set выбранных тегов.
 * @returns Отфильтрованный массив.
 */
export const filterTagAndGroupsStrategy = <T extends DataItemWithTags>(
	data: T[],
	selectedTags: SelectedTags
): T[] => {
	const hasAnySelected = Object.values(selectedTags).some(set => set.size > 0);
	if (!hasAnySelected) {
		return [];
	}

	return data.filter(item => {
		for (const [, selectedSet] of Object.entries(selectedTags)) {
			if (selectedSet.size === 0) continue;
			const hasMatch = (item.tags || []).some(tag => selectedSet.has(tag));
			if (!hasMatch) return false;
		}
		return true;
	});
};
