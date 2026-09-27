import { isISOString } from './is-iso-string';


export const fromISOString = (str: string): Date | null => {
	if (isISOString(str)) {
		return new Date(str);
	}
	return null;
};
