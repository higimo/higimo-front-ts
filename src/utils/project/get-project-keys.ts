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
