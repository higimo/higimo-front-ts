import { getRememberedValues } from "./getRememberedValues"

// @ts-ignore
export const EMPTY_FORM: Partial<FormValues> = {}

// @ts-ignore
export const getResetValues = (defaultValues: Partial<FormValues>, skipRemember = false): Partial<FormValues> => {
	const remembered = getRememberedValues()
	if (!skipRemember && remembered) {
		return remembered
	}
	if (defaultValues) {
		return defaultValues
	}
	return EMPTY_FORM
}
