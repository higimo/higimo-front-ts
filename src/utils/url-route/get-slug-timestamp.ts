/**
 * Возвращает текущую дату и время в виде slug, для key в api/paste
 *
 * Формат: `YYYY-MM-DD-HH-mm-ss-SSS` — ровно 23 символа.
 *
 * @example
 * // При системном времени 2024-03-01T12:34:56.789Z
 * getSlugTimestamp()
 * // → '2024-03-01-12-34-56-789'
 */
export const getSlugTimestamp = () =>
	new Date().toISOString().replace(/\D/g, '-').substring(0, 23)
