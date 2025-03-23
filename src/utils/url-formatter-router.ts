export const urlFormatterRouter = url => code => {
	return url.replace(/\/:([^\/]+)/, (_, key) => `/${code[key]}`)
}
