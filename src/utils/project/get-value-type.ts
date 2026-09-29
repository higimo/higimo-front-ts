/**
 * Показывает семантическую категорию значения
 *
 * 1. `null` / `undefined` → `'empty'`
 * 2. `number` → `'number'`
 * 3. `boolean` → `'boolean'`
 * 4. `Array.isArray` → `'array'` (проверяется до `typeof === 'object'`)
 * 5. `object` → `'object'`
 * 6. строка, совпадающая с ISO-префиксом `YYYY-MM-DD` → `'date'`
 * 7. всё остальное → `'string'`
 *
 * @example
 * getValueKind(null)             // 'empty'
 * getValueKind(42)               // 'number'
 * getValueKind('2024-03-01')     // 'date'
 * getValueKind('hello')          // 'string'
 */
export const getValueType = (value: any): string => {
	if (value === null || value === undefined) return 'empty'
	if (typeof value === 'number') return 'number'
	if (typeof value === 'boolean') return 'boolean'
	if (Array.isArray(value)) return 'array'
	if (typeof value === 'object') return 'object'
	if (/^\d{4}-\d{2}-\d{2}/.test(value)) return 'date'
	return 'string'
}
