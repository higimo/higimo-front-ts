import { DateOnlyString } from 'utils.type'

export const isValidDateOnly = (str: string): str is DateOnlyString =>
	/^\d{4}-\d{2}-\d{2}$/.test(str)
