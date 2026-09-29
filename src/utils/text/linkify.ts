/**
 * Превращает URL-адреса в тексте в HTML-теги `<a href="…">…</a>`.
 *
 * @example
 * linkify('См. https://example.com/docs')
 * // → 'См. <a href="https://example.com/docs">example.com/docs</a>'
 */
export const linkify = (str: string): string =>
	str.replace(/https?:\/\/[^\s<>"']+/g, (match) => {
		try {
			const url = new URL(match)
			const label = url.host + url.pathname
			return `<a href="${url.href}">${label}</a>`
		} catch {
			return match // невалидный URL скипаем
		}
	})
