import { describe, expect, test } from 'vitest'
import { getHumanDate } from './get-human-date.js'

describe('getHumanDate', () => {
	test('функция существует', () => {
		expect(typeof getHumanDate).toBe('function')
	})

	test('возвращает строку для даты', () => {
		const result = getHumanDate('2023-12-25')
		expect(typeof result).toBe('string')
	})

	test('работает без аргументов', () => {
		// @ts-ignore for unit-test
		const result = getHumanDate()
		expect(typeof result).toBe('string')
	})
})
