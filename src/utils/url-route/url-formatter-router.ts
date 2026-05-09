export const urlFormatterRouter = (url: string) => (code: string) => {
	return url.replace(/\/:([^\/]+)/, (_, key) => `/${code[key]}`)
}
