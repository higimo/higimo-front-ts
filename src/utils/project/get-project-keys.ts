/**
 * возвращает ключи объектка сортированные для отображения в порядке приоритета
 *
 * @example
 * const user = { id: 1, name: 'Ann', age: 30, email: 'a@b.c' }
 * getProjectKeys(user, ['id', 'email'])
 * // → ['id', 'email', 'age', 'name']
 *
 * @example
 * getProjectKeys({ a: 1, b: 2 }, ['z', 'a'])
 * // → ['a', 'b']
 *
 * @example
 * getProjectKeys({ c: 1, a: 2, b: 3 })
 * // → ['a', 'b', 'c']
 */
export const getProjectKeys = <T extends object>(
	data: T,
	priorityKeys: string[] = []
): string[] => {
	const allKeys = Object.keys(data)

	const prioritySet = new Set(priorityKeys)
	const priority: string[] = []
	const other: string[] = []

	allKeys.forEach(key => {
		if (prioritySet.has(key)) {
			priority.push(key)
		} else {
			other.push(key)
		}
	})

	const sortedPriority = priority.sort((a, b) => priorityKeys.indexOf(a) - priorityKeys.indexOf(b)
	)

	const sortedOther = other.sort()

	return sortedPriority.concat(sortedOther)
}
