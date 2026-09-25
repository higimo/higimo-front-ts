import { isDefined } from 'utils/is-defined'

export const getText = (str: string): string => {
	let result = str
	if (str.indexOf('</p>') > 0) {
		result = str.replace(/<\/p>/g, '').split('<p>').filter(isDefined)[0]!.trim()
	} else if (str.indexOf('\n') > 0) {
		result = str.substring(0, str.indexOf('\n'))
	}
	return result
}
