/*******************************
		ValueOf/KeyOf
********************************/

/**
 * Извлекает все возможные значения из объекта
 * @example
 * const obj = { a: 1, b: 2, c: 3 } as const
 * type Values = ValueOf<typeof obj> // 1 | 2 | 3
 */
export type ValueOf<T> = T[keyof T]

/**
 * Извлекает все возможные ключи из объекта (аналог keyof, но для читаемости)
 * @example
 * const obj = { a: 1, b: 2, c: 3 }
 * type Keys = KeyOf<typeof obj> // 'a' | 'b' | 'c'
 */
export type KeyOf<T> = keyof T

/**
 * Извлекает значения только определённого типа
 * @example
 * const mixed = { a: 1, b: 'string', c: true } as const
 * type StringValues = ValueOfType<typeof mixed, string> // 'string'
 */
export type ValueOfType<T, Type> = Extract<ValueOf<T>, Type>

/**
 * Извлекает ключи, значения которых соответствуют определённому типу
 * @example
 * const mixed = { a: 1, b: 'string', c: true }
 * type StringKeys = KeysOfType<typeof mixed, string> // 'b'
 */
export type KeysOfType<T, Type> = {
    [K in keyof T]: T[K] extends Type ? K : never
}[keyof T]

/**
 * Делает все значения объекта доступными как литералы
 * @example
 * const colors = { RED: 'red', GREEN: 'green', BLUE: 'blue' } as const
 * type ColorValues = LiteralValueOf<typeof colors> // 'red' | 'green' | 'blue'
 */
export type LiteralValueOf<T> = T[keyof T]

/**
 * Безопасное получение значения из объекта с дефолтом
 * @example
 * const value = getValueOrDefault(obj, 'key', 'default')
 */
export function getValueOrDefault<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    key: K,
    defaultValue: T[K]
): T[K] {
    return obj[key] ?? defaultValue
}

/*******************************
		Brand
********************************/

export type Brand<T, B extends string> = T & { readonly __brand: B }

export const brand2 = <T, B extends string>(value: T, brand: B): Brand<T, B> => value as Brand<T, B>

export const isBranded = <T, B extends string>(value: unknown, brand: B): value is Brand<T, B> => {
	return typeof value === 'object' && value !== null && '__brand' in value && (value as any).__brand === brand
}

export const unbrand = <T, B extends string>(value: Brand<T, B>): T => value as T


/*******************************
		Расширение примитивов
********************************/

/**
 * 2024-01-15T10:00:00Z
 */
export type ISOString = Brand<string, 'ISOString'>;

export const toISOString = (date: Date): ISOString => date.toISOString() as ISOString

export const fromISOString = (str: string): Date | null => {
	if (isISOString(str)) {
		return new Date(str)
	}
	return null
}

export const isISOString = (str: string): str is ISOString => {
	return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(str)
}

// Гвард для использования в рантайме
export const assertISOString = (str: string): asserts str is ISOString => {
	if (!isISOString(str)) {
		throw new Error(`Invalid ISO string: ${str}`)
	}
}

/**
 * Число в формате эпохи nix
 *
 * Например, 1778155911069
 */
export type UnixTime = Brand<number, 'UnixTime'>


/**
 * Число года
 */
export type YearNumber = Brand<number, 'YearNumber'>


/**
 * Только дата в формате `2024-01-15`
 */
export type DateOnlyString = Brand<string, 'DateOnlyString'>;

export const createDateOnly = (date: Date): DateOnlyString => date.toISOString().split('T')[0] as DateOnlyString

export const isValidDateOnly = (str: string): str is DateOnlyString => /^\d{4}-\d{2}-\d{2}$/.test(str)


/**
 * Символьный код элемента. Он же `slug`
 */
export type Code = string
