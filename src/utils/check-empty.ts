import { EmptyObject } from 'utils.type'

export const checkEmpty = (data: unknown): data is EmptyObject => {
	if (Array.isArray(data)) {
		return data.length === 0
	}

	if (data === null || data === undefined) {
		return true
	}

	if (typeof data === 'object') {
		return Object.keys(data).length === 0
	}

	return false
}
