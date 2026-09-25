import { describe, test, expect } from 'vitest'
import { isValidAuth } from 'utils/api/is-valid-auth'

const createAuth = (overrides: Partial<Parameters<typeof isValidAuth>[0]> = {}) => ({
	access_token: 'some-token',
	token_type: 'bearer',
	user: { id: 1 },
	...overrides,
})

describe('isValidAuth', () => {
	describe('валидные данные', () => {
		test('возвращает true при корректных данных', () => {
			expect(isValidAuth(createAuth())).toBe(true)
		})
	})

	describe('невалидные данные', () => {
		describe('access_token', () => {
			test.each([
				['undefined', { access_token: undefined } ],
				['null', { access_token: null } ],
				['пустая строка', { access_token: '' } ],
				['123 как число', { access_token: 123 as any } ],
			])('возвращает false при %s', (_, overrides) => {
				expect(isValidAuth(createAuth(overrides))).toBe(false)
			})
		})

		describe('token_type', () => {
			test.each([
				['Bearer с заглавной', { token_type: 'Bearer' } ],
				['oauth', { token_type: 'oauth' } ],
				['пустая строка', { token_type: '' } ],
				['undefined', { token_type: undefined } ],
				['"   "', { token_type: '  ' } ],
			])('возвращает false при %s', (_, overrides) => {
				expect(isValidAuth(createAuth(overrides))).toBe(false)
			})
		})

		describe('user.id', () => {
			test.each([
				['user отсутствует', { user: undefined }],
				['id = 0', { user: { id: 0 } }],
				['id = -5', { user: { id: -5 } }],
			])('возвращает false при %s', (_, overrides) => {
				expect(isValidAuth(createAuth(overrides))).toBe(false)
			})
		})

		test('возвращает false при полностью пустом объекте', () => {
			expect(isValidAuth({})).toBe(false)
		})
	})
})
