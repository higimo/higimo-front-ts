import { MetionSelector } from 'components/mention-textarea/types'

export const getWrittenMention = (value: string, caretPosition: number): MetionSelector | null => {
	if (caretPosition < 1 || caretPosition > value.length) {
		return null
	}

	let atPos = -1
	for (let i = caretPosition - 1; i >= 0; i--) {
		if (value[i] === '@') {
			if (i === 0 || /[\s\p{P}]/u.test(value.charAt(i - 1))) {
				atPos = i
				break
			}
		}
		if (!/\p{L}|\p{M}|_/u.test(value.charAt(i))) { // пробел или другой разделитель
			break
		}
	}

	if (atPos === -1) {
		return null
	}

	let endPos = caretPosition
	while (endPos < value.length && !/[\s\p{P}]/u.test(value.charAt(endPos))) {
		endPos++
	}

	const mentionText = value.slice(atPos + 1, endPos)
	return { text: mentionText, start: atPos, end: endPos }
}
