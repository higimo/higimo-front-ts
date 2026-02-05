/**
 * Проверит, что в аргументе не пустой список элементов или непустой единственный элемент
 */
export const useEmptyDataState = (data: any) => {
    if (Array.isArray(data)) {
        return data.length === 0
    }

    if (data === null) {
        return true
    }

    if (typeof data === 'object') {
        return Object.keys(data).length === 0
    }

    return true
}
