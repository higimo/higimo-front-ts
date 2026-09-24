import { describe, it, expect } from 'vitest'
import { formatDate } from 'utils/date/format-date'

describe('[utils] formatDate', () => {
	it('Форматирует псевдо ISO в русскую дату', () => {
		expect(formatDate('2026-12-31 23:59:59')).toBe('31.12.2026')
	})
})
