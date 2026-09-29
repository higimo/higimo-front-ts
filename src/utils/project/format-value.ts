/**
 * Приводит значения для эффективного отображения в таблице проектов
 *
 * Правила форматирования по типу значения:
 * * `null` / `undefined` => `'—'`
 * * `boolean` => `'✓'` / `'✗'`
 * * `number > 1_000_000` => `2_500_000 → '2.5M'`
 * * `number > 1_000` => `1_500 → '1.5K'`
 * * `number` (остальные) => `42 → '42'`
 * * `string` в формате ISO-даты => `'2024-03-01…' → '01.03.2024'`
 * * `string` (остальные) => `'hi' → 'hi'`
 * * `Array` => `[1,2] → '1, 2'`
 * * `object` => `{a:1,b:2} → '{2}'`
 * * прочее => `''`
 *
 * @example
 * formatDisplayValue(true)         // '✓'
 * formatDisplayValue(2_500_000)    // '2.5M'
 * formatDisplayValue('2024-03-01') // '01.03.2024'
 */
export const formatValue = (value: any): string => {
	if (value === null || value === undefined) {
		return '—'
	}

	if (typeof value === 'boolean') {
		return value ? '✓' : '✗'
	}

	if (typeof value === 'number') {
		if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
		if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
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
