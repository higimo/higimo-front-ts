export const getValueType = (value: any): string => {
	if (value === null || value === undefined) return 'empty'
	if (typeof value === 'number') return 'number'
	if (typeof value === 'boolean') return 'boolean'
	if (Array.isArray(value)) return 'array'
	if (typeof value === 'object') return 'object'
	if (/^\d{4}-\d{2}-\d{2}/.test(value)) return 'date'
	return 'string'
}
