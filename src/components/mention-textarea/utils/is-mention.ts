export const isMention = (value: string, caretPosition: number): boolean => {
	if (caretPosition < 1) return false

	for (let i = caretPosition - 1; i >= 0; i--) {
		const char = value[i] || ''

		if (char === '@') {
			return i === 0 || /[\s\p{P}]/u.test(value[i - 1] || '')
		}

		// пробел или другой разделитель
		if (!/\p{L}|\p{M}|_/u.test(char)) {
			return false
		}
	}

	return false
}
