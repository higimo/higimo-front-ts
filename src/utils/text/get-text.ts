// TODO: написать тесты и JSDoc, имя сменить
export const getText = (str?: string): string => {
	let result = str || ''
	if (result.indexOf('</p>') > 0) {
		const arr = result
			.replace(/<\/p>/g, '')
			.split('<p>')
			.filter(Boolean)
		if (!!arr[0]) {
			return arr[0].trim()
		} else {
			return ''
		}
	} else if (result.indexOf('\n') > 0) {
		result = result.substring(0, result.indexOf('\n'))
	}
	return result
}
