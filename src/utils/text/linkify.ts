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
