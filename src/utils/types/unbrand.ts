import { Brand } from 'utils.type'

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

export const unbrand = <T, B extends string>(value: Brand<T, B>): T =>
	value as T
