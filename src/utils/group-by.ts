export const groupBy = <T, const K extends PropertyKey>(
	items: readonly T[],
	getKey: (item: T) => K
): Record<K, T[]> => {
	const result = {} as Record<K, T[]>

	for (const item of items) {
		const key = getKey(item)
		const bucket = result[key]

		if (bucket) {
			bucket.push(item)
		} else {
			result[key] = [item]
		}
	}

	return result
}
