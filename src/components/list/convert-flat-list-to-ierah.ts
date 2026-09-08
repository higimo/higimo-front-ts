import { ListerItem, ListListType } from 'api-types/listlist.types'

// TODO: [LIGHT] а это точно используется?
/**
 * Преобразует плоский список элементов в иерархическую структуру с вложенностью.
 *
 * В массиве должно быть parent_id для указания родителя. Родитель указывается по id
 * У каждого элемента будет пустой масив `child`, как минимум
 * Поле `parent === null`, если это корневой элемент
 *
 * **Важно:** элементы дублируются в массиве в child, то есть остаются в корне
 *
 * @param {ListerItem[]} list - Массив элементов для преобразования.
 *   Каждый элемент должен иметь:
 *   - `id` (уникальный идентификатор)
 *   - `parent_id` (числовой идентификатор родителя, если `parent === true`)
 *   - любые другие поля, которые будут сохранены.
 *
 * @returns {ListListType[]} Массив всех элементов, у каждого из которых добавлено поле `child`
 *   (массив дочерних элементов). Элементы, для которых родитель не найден, получают `parent = null`.
 *
 * @example
 * // Пример 2: иерархия
 * const flat = [
 *   { id: 1, parent: null, name: 'Root' },
 *   { id: 2, parent: true, parent_id: 1, name: 'Child' }
 * ]
 * convertFlatListToIerah(flat)
 * // Результат:
 * // [
 * //   { id: 1, parent: null, name: 'Root', child: [
 * //       { id: 2, parent: true, parent_id: 1, name: 'Child', child: [] }
 * //     ]
 * //   },
 * //   { id: 2, parent: true, parent_id: 1, name: 'Child', child: [] } // дублирование
 * // ]
 *
 * @see {@link ListerItem} - входной тип
 * @see {@link ListListType} - выходной тип (добавляется поле `child`)
 */
export const convertFlatListToIerah = (list: ListerItem[]): ListListType[] => {
	const hashMap: Record<ListerItem['id'], ListListType> = {}
	for (let i = 0, l = list.length; i < l; i++) {
		hashMap[list[i].id] = list[i]
		hashMap[list[i].id].child = []
	}
	for (let i = 0, l = list.length; i < l; i++) {
		if (list[i].parent) {
			if (hashMap[list[i].parent_id]) {
				hashMap[list[i].parent_id].child.push(list[i])
			} else {
				list[i].parent = null
			}
		}
	}
	return Object.values(hashMap)
}
