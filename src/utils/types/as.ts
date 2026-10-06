interface AsFn {
	/** Без проверок — просто приводит тип (runtime-проверки нет). */
	<T>(v: unknown): T
	/** С проверкой наличия полей через Boolean. */
	<T>(v: unknown, fields: readonly (keyof T)[]): v is T
	/** С кастомным колбеком вместо проверки полей. */
	<T>(
		v: unknown,
		fields: readonly (keyof T)[],
		validate: (value: Partial<T>) => boolean,
	): v is T
}

export const as: AsFn = (<T>(
	v: unknown,
	fields?: readonly (keyof T)[],
	validate?: (value: Partial<T>) => boolean,
): T | boolean => {
	// доверям вызывающем, если не указал параметры
	if (!fields && !validate) {
		return v as T
	}

	if (typeof v !== 'object' || v === null) {
		return false
	}

	const obj = v as Partial<T>

	if (validate) {
		return validate(obj)
	}

	return fields!.every((field) => Boolean(obj[field]))
}) as AsFn
