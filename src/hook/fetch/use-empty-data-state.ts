type EmptyValue = null | undefined | [] | Record<string, never>;

/**
 * Проверит, что в аргументе не пустой список элементов или непустой единственный элемент
 * TODO: [HARD] после интеграции этого в uaeApi переименовать в is
 */
export const useEmptyDataState = (data: unknown): data is EmptyValue => {
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
