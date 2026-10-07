import { getRememberedValues } from 'components/form/getRememberedValues'

// TODO: [LIGHT] переместить в утилиты

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
