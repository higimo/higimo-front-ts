import { Brand } from 'utils.type'

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
 *          равным `brand`, иначе `false`.
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
