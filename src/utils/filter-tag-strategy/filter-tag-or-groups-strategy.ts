import { DataItemWithTags, SelectedTags } from 'types'

// TODO: [LAST] unused

/**
 * Стратегия "OR между группами, OR внутри группы".
 *
 * Элемент должен содержать хотя бы один тег хотя бы из одной группы, в которой есть выбранные теги.
 * Если ни в одной группе нет выбранных тегов, возвращаются все элементы.
 *
 * ### Использование
 * ```ts
 * const filteredData = useMemo(
 * 	() => filterTagOrGroupsStrategy(stateData.barPovMoscow, selectedTags),
 * 	[stateData.barPovMoscow, selectedTags]
 * );
 * ```
 *
 * @param data - Массив элементов с полем `tags: string[]`.
 * @param selectedTags - Объект, где ключ — группа, значение — Set выбранных тегов.
 * @returns Отфильтрованный массив.
 */
export const filterTagOrGroupsStrategy = <T extends DataItemWithTags>(
	data: T[],
	selectedTags: SelectedTags
): T[] => {
	const hasAnySelected = Object.values(selectedTags).some(set => set.size > 0);
	if (!hasAnySelected) {
		return data;
	}

	return data.filter(item => {
		for (const [, selectedSet] of Object.entries(selectedTags)) {
			if (selectedSet.size === 0) continue;
			const hasMatch = (item.tags || []).some(tag => selectedSet.has(tag.title));
			if (hasMatch) return true;
		}
		return false;
	});
};
