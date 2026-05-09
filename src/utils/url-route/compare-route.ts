/**
 * Нормализует путь, добавляя слеш в конец при необходимости
 * @internal
 */
const normalizePath = (path: string): string =>
	path.endsWith('/') ? path : path + '/'

/**
 * Сравнивает два маршрута (роута), игнорируя наличие или отсутствие завершающего слеша
 *
 * @param left - Первый маршрут для сравнения
 * @param right - Второй маршрут для сравнения
 * @returns `true`, если маршруты эквивалентны (с учетом нормализации слеша), иначе `false`
 *
 * @example
 * ```js
 * // Возвращает true
 * compareRoute('/admin', '/admin/') // true
 * compareRoute('/dashboard/', '/dashboard') // true
 * compareRoute('/settings', '/settings') // true
 *
 * compareRoute('/admin', '/user') // false
 * compareRoute('/admin/', '/dashboard/') // false
 * ```
 */
export const compareRoute = (left: string, right: string): boolean =>
	normalizePath(left) === normalizePath(right)
