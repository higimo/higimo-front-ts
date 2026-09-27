import { ISOString } from 'utils.type';


export const isISOString = (str: string): str is ISOString => {
	return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/.test(str);
};
