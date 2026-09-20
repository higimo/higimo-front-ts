import { TargetedEvent } from 'preact'

import { EXTERNAL_LINKS } from 'dic/EXTERNAL_LINKS'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

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

/**
 * Проверяет, что значение является брендированным типом с указанным брендом
 *
 * Проверяется в рантайме, только поле __brand, это никаких других проверок быть не может
 *
 * @template T — базовый тип, скрытый за брендом (например, `number`).
 * @template B — строковый литерал бренда (например, `'Positive'`).
 *
 * @param value — значение для проверки.
 * @param brand — ожидаемое имя бренда.
 *
 * @returns `true`, если значение является объектом с полем `__brand`,
 *          равным `brand`; иначе `false`.
 *
 * @example
 * ```ts
 * const x: unknown = asPositive(5)
 * if (isBranded<number, 'Positive'>(x, 'Positive')) {
 *   // x: Brand<number, 'Positive'>
 *   console.log(x) // 5
 * }
 * ```
 */
export const isBranded = <T, B extends string>(value: unknown, brand: B): value is Brand<T, B> => {
	return typeof value === 'object' && value !== null && '__brand' in value && (value as any).__brand === brand
}

/**
 * Снимает бренд со значения и возвращает его базовый тип
 *
 * В рантайме буквально: `val => val`
 *
 * @template T — базовый тип, который нужно получить
 * @template B — строковый литерал бренда
 *
 * @param value — брендированное значение
 *
 * @returns То же значение с типом `T`
 *
 * @example
 * ```ts
 * const positive: Brand<number, 'Positive'> = asPositive(5)
 * const plain: number = unbrand(positive)
 * console.log(plain + 1) // 6
 * ```
 */
export const unbrand = <T, B extends string>(value: Brand<T, B>): T => value as T



/*******************************
		Расширение примитивов
********************************/

/**
 * 2024-01-15T10:00:00Z
 */
export type ISOString = Brand<string, 'ISOString'>

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
 * Число в формате эпохи nix БЕЗ МИЛИСЕКУНД (надо умножать на 1000)
 *
 * Например, 1778155911069
 */
export type UnixTimeSecond = Brand<number, 'UnixTimeSecond'>


/**
 * Число года
 */
export type YearNumber = Brand<number, 'YearNumber'>


/**
 * Только дата в формате `2024-01-15`
 */
export type DateOnlyString = Brand<string, 'DateOnlyString'>

export const createDateOnly = (date: Date): DateOnlyString => date.toISOString().split('T')[0] as DateOnlyString

export const isValidDateOnly = (str: string): str is DateOnlyString => /^\d{4}-\d{2}-\d{2}$/.test(str)


/**
 * Символьный код элемента. Он же `slug`
 */
export type Code = string


/**
 * Координаты
 */
export type Coord = [number, number]

/**
 * Базовая точка на карте
 * TODO: [HARD]: внедрить во все типы с точками
 */
export type BasePointType = {
	title: string
	coord: Coord
}


/**
 * Поизитивное число: 1, 100, но не 0 и -2
 */
export type Positive = Brand<number, 'positive'>

export function asPositive(n: number): Positive {
	if (n <= 0) {
		throw new RangeError(`Expected positive number, got ${n}`)
	}
	return n as Positive
}


/**
 * Белево значение, но в виде числа 1 | 0
 */
export type BooleanNumber = Brand<number, 'BooleanNumber'>



/**
 * Просто пустой объект, без подсказок
 *
 * Использовать, например, для useApi, когда передаётся -1 (в этом случае, он возвращает `{}`)
 */
export type EmptyObject = {}


/**
 * Просто пустой объект, с подсказками ключей
 * Более многословный и может быть не удобно
 *
 * Использовать, например, для useApi, когда передаётся -1 (в этом случае, он возвращает `{}`)
 */
export type EmptyObjectBy<T extends PropertyKey> = Record<T, never>


/**********************
	Пока не понятно, куда это положить
***********************/

export type InterLinkType = {
	title: string,
	href: ValueOf<typeof ROUTE_LINKS>
}

export type IntroImageMappingType = Record<string, string>

export type IntroLinkDataType = {
	isAdmin?: boolean,
	isArchive?: boolean
	isInactive?: boolean
	title: string
	href: ValueOf<typeof EXTERNAL_LINKS> | ValueOf<typeof ROUTE_LINKS>
	description: string
	// imgId: 'screen' | 'rak' | 'tech' | 'obuchenie' | 'intersection'
}
	& ({ imgId: string } | { imgId?: undefined })
	& ({ img: string } | { img?: undefined })


/** Событие onChange в input или textarea */
export type ChangeEvent = TargetedEvent<
	HTMLInputElement|HTMLTextAreaElement,
	InputEvent|Event
>


export type ClassNameType = {
	className?: string
}
