import { ISOString } from 'utils.type';
import { isISOString } from './is-iso-string';

// Гвард для использования в рантайме

export const assertISOString = (str: string): asserts str is ISOString => {
	if (!isISOString(str)) {
		throw new Error(`Invalid ISO string: ${str}`);
	}
};
