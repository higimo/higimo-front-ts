import { describe, expect, it } from 'vitest'
import { formatValue } from 'utils/project/format-value'


describe('formatValue', () => {
	describe('null / undefined', () => {
		it.each([null, undefined])('возвращает тире для %s', (value) => {
			expect(formatValue(value)).toBe('—')
		})
	})

	describe('boolean', () => {
		it('возвращает ✓ для true', () => {
			expect(formatValue(true)).toBe('✓')
		})

		it('возвращает ✗ для false', () => {
			expect(formatValue(false)).toBe('✗')
		})
	})

	describe('number', () => {
		it('форматирует миллионы с суффиксом M и одним знаком после точки', () => {
			expect(formatValue(2_500_000)).toBe('2.5M')
			expect(formatValue(1_000_001)).toBe('1.0M')
		})

		it('форматирует тысячи с суффиксом K и одним знаком после точки', () => {
			expect(formatValue(1_500)).toBe('1.5K')
			expect(formatValue(999_999)).toBe('1000.0K')
		})

		it('применяет сокращение на границах (ровно 1000 и 1_000_000)', () => {
			expect(formatValue(1000)).toBe(('1.0K'))
			expect(formatValue(1_000_000)).toBe('1.0M')
		})

		it('использует локаль для чисел без сокращения', () => {
			expect(formatValue(999)).toBe((999).toLocaleString())
			expect(formatValue(0)).toBe('0')
		})

		it('обрабатывает отрицательные числа через toLocaleString', () => {
			expect(formatValue(-42)).toBe((-42).toLocaleString())
		})
	})

	describe('string', () => {
		it('форматирует ISO-дату через toLocaleDateString', () => {
			const iso = '2024-03-01'
			expect(formatValue(iso)).toBe(new Date(iso).toLocaleDateString())
		})

		it('форматирует ISO-дату со временем (проверяется только префикс)', () => {
			const iso = '2024-03-01T12:34:56Z'
			expect(formatValue(iso)).toBe(new Date(iso).toLocaleDateString())
		})

		it('возвращает обычные строки как есть', () => {
			expect(formatValue('hello')).toBe('hello')
			expect(formatValue('')).toBe('')
		})

		it('не считает датой строку, похожую на дату, но не совпадающую с regex', () => {
			expect(formatValue('01-03-2024')).toBe('01-03-2024')
			expect(formatValue('2024/03/01')).toBe('2024/03/01')
			expect(formatValue('2024-3-1')).toBe('2024-3-1')
		})
	})

	describe('array', () => {
		it('объединяет элементы через ", "', () => {
			expect(formatValue([1, 2, 3])).toBe('1, 2, 3')
		})

		it('возвращает пустую строку для пустого массива', () => {
			expect(formatValue([])).toBe('')
		})

		it('не уходит в ветку объектов (порядок проверок)', () => {
			expect(formatValue(['a', 'b'])).toBe('a, b')
		})
	})

	describe('object', () => {
		it('возвращает количество ключей в фигурных скобках', () => {
			expect(formatValue({ a: 1, b: 2, c: 3 })).toBe('{3}')
		})

		it('возвращает {0} для пустого объекта', () => {
			expect(formatValue({})).toBe('{0}')
		})

		it('считает только собственные перечислимые ключи', () => {
			const proto = { inherited: true }
			const obj = Object.create(proto)
			obj.own = 1
			expect(formatValue(obj)).toBe('{1}')
		})
	})

	describe('прочее', () => {
		it('приводит символьно-подобные значения через String', () => {
			expect(formatValue(10n)).toBe('10')
		})
	})
})
