import { describe, expect, it } from 'vitest'
import { getValueType } from 'utils/project/get-value-type'

describe('getValueType', () => {
	describe('empty', () => {
		it.each([
			['null', null],
			['undefined', undefined],
		])('возвращает "empty" для %s', (_label, value) => {
			expect(getValueType(value)).toBe('empty')
		})
	})

	describe('примитивы', () => {
		it('возвращает "number" для чисел', () => {
			expect(getValueType(0)).toBe('number')
			expect(getValueType(-1.5)).toBe('number')
			expect(getValueType(NaN)).toBe('number')
			expect(getValueType(Infinity)).toBe('number')
		})

		it('возвращает "boolean" для булевых значений', () => {
			expect(getValueType(true)).toBe('boolean')
			expect(getValueType(false)).toBe('boolean')
		})
	})

	describe('коллекции', () => {
		it('возвращает "array" для массивов', () => {
			expect(getValueType([])).toBe('array')
			expect(getValueType([1, 2, 3])).toBe('array')
		})

		it('возвращает "object" для обычных объектов', () => {
			expect(getValueType({})).toBe('object')
			expect(getValueType({ a: 1 })).toBe('object')
		})

		it('возвращает "object" для объектов с прототипом и встроенных объектов', () => {
			expect(getValueType(new Date())).toBe('object')
			expect(getValueType(/re/)).toBe('object')
			expect(getValueType(new Map())).toBe('object')
		})

		it('проверяет массив до объекта (порядок веток)', () => {
			expect(getValueType(['a'])).toBe('array')
			expect(getValueType({ 0: 'a', length: 1 })).toBe('object')
		})
	})

	describe('строки и даты', () => {
		it('возвращает "date" для строк, начинающихся с YYYY-MM-DD', () => {
			expect(getValueType('2024-03-01')).toBe('date')
			expect(getValueType('2024-03-01T12:00:00Z')).toBe('date')
			expect(getValueType('2024-03-01 anything after')).toBe('date')
		})

		it('возвращает "string" для обычных строк', () => {
			expect(getValueType('hello')).toBe('string')
			expect(getValueType('')).toBe('string')
		})

		it('не считает датой не-ISO форматы', () => {
			expect(getValueType('01-03-2024')).toBe('string')
			expect(getValueType('2024/03/01')).toBe('string')
			expect(getValueType('2024-3-1')).toBe('string')
			expect(getValueType('24-03-01')).toBe('string')
		})
	})

	describe('прочие примитивы (уходят в ветку "string")', () => {
		it('возвращает "string" для bigint (regex приводит к строке)', () => {
			expect(getValueType(10n)).toBe('string')
		})

		it('возвращает "string" для функций', () => {
			expect(getValueType(() => {})).toBe('string')
		})
	})
})
