import { ISOString } from 'utils.type'
import { isISOString } from 'utils/types/is-iso-string'

export const assertISOString = (str: string): asserts str is ISOString => {
	if (!isISOString(str)) {
		throw new Error(`Invalid ISO string: ${str}`)
	}
}
