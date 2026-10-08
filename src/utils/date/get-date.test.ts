import { describe, it, expect } from 'vitest'
import { getHumanMonthDate } from 'utils/date/get-date'

describe('[utils] formatDate', () => {
	it('обрабатывает null', () => {
		expect(getHumanMonthDate(null)).toBe(null)
	})

	it('Показывает все месяцы', () => {
		expect(getHumanMonthDate('2026-01-31 23:59:59')).toBe('31 января')
		expect(getHumanMonthDate('2026-02-28 23:59:59')).toBe('28 февраля')
		expect(getHumanMonthDate('2026-03-31 23:59:59')).toBe('31 марта')
		expect(getHumanMonthDate('2026-04-30 23:59:59')).toBe('30 апреля')
		expect(getHumanMonthDate('2026-05-31 23:59:59')).toBe('31 мая')
		expect(getHumanMonthDate('2026-06-30 23:59:59')).toBe('30 июня')
		expect(getHumanMonthDate('2026-07-31 23:59:59')).toBe('31 июля')
		expect(getHumanMonthDate('2026-08-31 23:59:59')).toBe('31 августа')
		expect(getHumanMonthDate('2026-09-30 23:59:59')).toBe('30 сентября')
		expect(getHumanMonthDate('2026-10-31 23:59:59')).toBe('31 октября')
		expect(getHumanMonthDate('2026-11-30 23:59:59')).toBe('30 ноября')
		expect(getHumanMonthDate('2026-12-31 23:59:59')).toBe('31 декабря')
	})
})
