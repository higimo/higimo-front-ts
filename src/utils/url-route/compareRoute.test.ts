import { describe, it, expect } from 'vitest'
import { compareRoute } from './compare-route'

describe('compareRoute', () => {
	it('должен считать эквивалентными пути со слешем и без', () => {
		expect(compareRoute('/admin', '/admin/')).toBe(true)
		expect(compareRoute('/dashboard/', '/dashboard')).toBe(true)
	})

	it('должен корректно сравнивать идентичные пути', () => {
		expect(compareRoute('/home', '/home')).toBe(true)
		expect(compareRoute('/home/', '/home/')).toBe(true)
	})

	it('должен различать разные пути', () => {
		expect(compareRoute('/admin', '/user')).toBe(false)
		expect(compareRoute('/admin/', '/user/')).toBe(false)
	})

	it('должен корректно обрабатывать пустые строки', () => {
		expect(compareRoute('', '')).toBe(true)
		expect(compareRoute('', '/')).toBe(true)
		expect(compareRoute('/', '')).toBe(true)
	})

	it('должен работать со сложными путями', () => {
		expect(compareRoute('/api/v1/users/123', '/api/v1/users/123/')).toBe(true)
		expect(compareRoute('/posts/2024/03', '/posts/2024/03/')).toBe(true)
	})
})
