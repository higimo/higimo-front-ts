export const formatValue = (value: any): string => {
	if (value === null || value === undefined) {
		return '—'
	}

	if (typeof value === 'boolean') {
		return value ? '✓' : '✗'
	}

	if (typeof value === 'number') {
		if (value > 1000000) return `${(value / 1000000).toFixed(1)}M`
		if (value > 1000) return `${(value / 1000).toFixed(1)}K`
		return value.toLocaleString()
	}

	if (typeof value === 'string') {
		if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
			return new Date(value).toLocaleDateString()
		}
		return value
	}

	if (Array.isArray(value)) {
		return value.join(', ')
	}

	if (typeof value === 'object') {
		return `{${Object.keys(value).length}}`
	}

	return String(value)
}
