export const getOrInsert = <T extends object, K extends keyof T>(
	obj: T,
	key: K,
	value: NonNullable<T[K]>
): NonNullable<T[K]> => {
	const current = obj[key]

	if (current === undefined || current === null) {
		obj[key] = value
		return value
	}

	return current as NonNullable<T[K]>
}
