export const parseJson = (text: string): Record<string, any> | undefined => {
	try {
		return JSON.parse(text);
	} catch {
		try {
			// Пытаемся исправить невалидный JSON (без кавычек в ключах)
			const fixed = text.replace(/^(\s*?)(\S*?):/gm, '$1"$2":')
			return JSON.parse(fixed)
		} catch {
			console.error('Failed to parse JSON')
			return undefined;
		}
	}
};
