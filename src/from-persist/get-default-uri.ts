/**
 * Возвращает стандартный URI текущей страницы, включая GET-параметры
 */
export const getDefaultUri = (): string =>
	window.location.pathname + window.location.search
