import { describe, test, expect } from 'vitest'
import { isValidAuth } from 'utils/is-valid-auth'

describe('isValidAuth', () => {
	describe('валидные данные', () => {
		test('возвращает true при корректных данных', () => {
			expect(isValidAuth({
				access_token: 'some-token',
				token_type: 'bearer',
				user: { id: 1 },
			})).toBe(true)
		})
	})

	describe('невалидные данные', () => {
		test('возвращает false при отсутствии access_token', () => {
			// TODO: [LIGHT] написать функцию-генератор объекта,
			// чтобы туда передавать массив
			// и проходиться по массиву проверяя
			expect(isValidAuth({
				token_type: 'bearer',
				user: { id: 1 },
			})).toBe(false)

			expect(isValidAuth({
				access_token: undefined,
				token_type: 'bearer',
				user: { id: 1 },
			})).toBe(false)

			expect(isValidAuth({
				access_token: null as any,
				token_type: 'bearer',
				user: { id: 1 },
			})).toBe(false)
		})

		test('возвращает false при пустом access_token', () => {
			expect(isValidAuth({
				access_token: '',
				token_type: 'bearer',
				user: { id: 1 },
			})).toBe(false)
		})

		test('возвращает false при неверном token_type', () => {
			expect(isValidAuth({
				access_token: 'abc',
				token_type: 'Bearer',
				user: { id: 1 },
			})).toBe(false)

			expect(isValidAuth({
				access_token: 'abc',
				token_type: 'oauth',
				user: { id: 1 },
			})).toBe(false)

			expect(isValidAuth({
				access_token: 'abc',
				token_type: '',
				user: { id: 1 },
			})).toBe(false)

			expect(isValidAuth({
				access_token: 'abc',
				token_type: undefined,
				user: { id: 1 },
			})).toBe(false)
		})

		test('возвращает false при отсутствии или некорректном user.id', () => {
			expect(isValidAuth({
				access_token: 'abc',
				token_type: 'bearer',
			})).toBe(false)

			expect(isValidAuth({
				access_token: 'abc',
				token_type: 'bearer',
				user: { id: 0 },
			})).toBe(false)

			expect(isValidAuth({
				access_token: 'abc',
				token_type: 'bearer',
				user: { id: -5 },
			})).toBe(false)

			expect(isValidAuth({
				access_token: 'abc',
				token_type: 'bearer',
				user: { id: undefined as any },
			})).toBe(false)

			expect(isValidAuth({
				access_token: 'abc',
				token_type: 'bearer',
				user: { id: null as any },
			})).toBe(false)
		})

		test('возвращает false при полностью пустом объекте', () => {
			expect(isValidAuth({})).toBe(false)
		})
	})
})
