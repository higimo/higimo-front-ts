/**
 * Регулярное выражение для поиска упоминаний в формате @{...}
 *
 * @description
 * Ищет шаблоны вида @{текст}, где текст может содержать:
 * - Латинские буквы (a-z)
 * - Русские буквы (а-я, ё, Ë)
 * - Цифры (0-9)
 * - Дефис, нижнее подчеркивание, пробел, неразрывный пробел
 * - Длина текста от 1 до 25 символов
 *
 * @example
 * // Найдет упоминания в:
 * "Привет @{username}" // → "@{username}"
 * "Hello @{user_123}"  // → "@{user_123}"
 * "Hi @{Имя Фамилия}"  // → "@{Имя Фамилия}"
 *
 * @constant
 * @type {RegExp}
 */
const HASH_TAG_REGEXP = /(?:^|[^\S])@\{([a-zа-яёË0-9_\-  ]{1,25})\}/gmi

/**
 * Извлекает список уникальных упоминаний из текста
 *
 * @description
 * Функция находит все упоминания в формате @{...} и возвращает
 * массив уникальных значений без символов "@" и "{}"
 *
 * @param {string} text - Исходный текст для поиска упоминаний
 * @returns {Array<string | null>} Массив уникальных упоминаний (значения внутри фигурных скобок)
 *
 * @example
 * ```ts
 * // Базовое использование
 * const text = "Привет @{user123} и @{коллега}"
 * getMentionList(text) // → ["user123", "коллега"]
 * ```
 *
 * @example
 * // Удаление дубликатов
 * const text = "@{admin} и @{admin} и @{moderator}"
 * getMentionList(text) // → ["admin", "moderator"]
 *
 * @example
 * // Пустой результат
 * getMentionList("Нет упоминаний") // → []
 *
 * @example
 * // Невалидные форматы игнорируются
 * getMentionList("@username @{user}") // → ["user"] // только второй формат
 */
export const getMentionList = (text: string): string[] => {
	const matches = text.matchAll(HASH_TAG_REGEXP)

	const mentions = Array.from(matches)
		.map(match => match[1])
		.filter((mention): mention is string => mention !== null && mention !== undefined)

	return Array.from(new Set(mentions))
}
