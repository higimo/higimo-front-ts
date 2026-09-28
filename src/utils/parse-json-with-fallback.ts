export const parseJsonWithFallback = (jsonString: string): Record<string, any> => {
	try {
		return JSON.parse(jsonString)
	} catch {
		try {
			// Пытаемся исправить невалидный JSON (без кавычек в ключах)
			const fixed = jsonString.replace(/^(\s*?)(\S*?):/gm, '$1"$2":')
			return JSON.parse(fixed)
		} catch {
			console.error('Failed to parse JSON')
			return {}
		}
	}
}
