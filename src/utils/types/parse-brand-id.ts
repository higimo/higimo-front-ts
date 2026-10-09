import { Brand } from 'utils.type'

/**
 * Парсит id из строки/числа и брендирует.
 * Бросает при невалидном вводе.
 *
 * @example
 * ```ts
 * parseBrandId<PasteApiType['id']>(DEFAULT_ID)
 * ```
 */
export const parseBrandId = <T extends Brand<number, string>>(
	value: string | number,
): T => {
	const n = Number(value)
	if (!Number.isFinite(n)) {
		throw new Error(`Cannot parse id from "${value}"`)
	}
	return n as T
}
