import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getSlugTimestamp } from 'utils/url-route/get-slug-timestamp'

describe('getSlugTimestamp', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	describe('формат результата', () => {
		it('возвращает строку длиной 23 символа', () => {
			vi.setSystemTime(new Date('2024-03-01T12:34:56.789Z'))

			expect(getSlugTimestamp()).toHaveLength(23)
		})

		it('возвращает дату в формате YYYY-MM-DD-HH-mm-ss-SSS', () => {
			vi.setSystemTime(new Date('2024-03-01T12:34:56.789Z'))

			expect(getSlugTimestamp()).toBe('2024-03-01-12-34-56-789')
		})

		it('содержит только цифры и дефисы', () => {
			vi.setSystemTime(new Date('2024-03-01T12:34:56.789Z'))

			expect(getSlugTimestamp()).toMatch(/^[\d-]+$/)
		})

		it('не содержит "T", ":", ".", "Z" (заменены на дефисы)', () => {
			vi.setSystemTime(new Date('2024-03-01T12:34:56.789Z'))
			const result = getSlugTimestamp()

			expect(result).not.toMatch(/[T:.Z]/)
		})
	})

	describe('конкретные значения', () => {
		it('корректно обрабатывает полночь', () => {
			vi.setSystemTime(new Date('2024-03-01T00:00:00.000Z'))

			expect(getSlugTimestamp()).toBe('2024-03-01-00-00-00-000')
		})

		it('корректно обрабатывает конец дня', () => {
			vi.setSystemTime(new Date('2024-03-01T23:59:59.999Z'))

			expect(getSlugTimestamp()).toBe('2024-03-01-23-59-59-999')
		})
	})

	describe('уникальность в разных миллисекундах', () => {
		it('разные моменты времени дают разные слаги', () => {
			vi.setSystemTime(new Date('2024-03-01T12:34:56.789Z'))
			const first = getSlugTimestamp()

			vi.setSystemTime(new Date('2024-03-01T12:34:56.790Z'))
			const second = getSlugTimestamp()

			expect(first).not.toBe(second)
			expect(first).toBe('2024-03-01-12-34-56-789')
			expect(second).toBe('2024-03-01-12-34-56-790')
		})

		it('в один и тот же момент возвращает одинаковый результат', () => {
			vi.setSystemTime(new Date('2024-03-01T12:34:56.789Z'))

			expect(getSlugTimestamp()).toBe(getSlugTimestamp())
		})
	})

	describe('лексикографическая сортировка', () => {
		it('строки сортируются в хронологическом порядке', () => {
			vi.setSystemTime(new Date('2024-03-01T12:34:56.789Z'))
			const a = getSlugTimestamp()

			vi.setSystemTime(new Date('2024-03-01T12:34:57.000Z'))
			const b = getSlugTimestamp()

			vi.setSystemTime(new Date('2024-03-02T00:00:00.000Z'))
			const c = getSlugTimestamp()

			expect([c, a, b].sort()).toEqual([a, b, c])
		})
	})
})
