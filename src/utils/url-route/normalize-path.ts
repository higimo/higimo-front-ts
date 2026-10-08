/**
 * Нормализует путь, добавляя слеш в конец при необходимости
 * @internal
 */
export const normalizePath = (path: string): string =>
	path.endsWith('/') ? path : path + '/'
