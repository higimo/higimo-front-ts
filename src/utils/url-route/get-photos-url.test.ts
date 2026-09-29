import { describe, expect, it } from 'vitest'

import { getVkPhotosUrl } from 'utils/url-route/get-photos-url'

/**
 * Хелпер: приводит произвольные пары {type, url} к форме, совместимой
 * с `VkPhotoType['sizes']`. Позволяет не засорять тесты полями VK API,
 * которые функция не использует.
 */
const sizes = (...items: Array<{ type: string; url: string }>) =>
	items as unknown as Parameters<typeof getVkPhotosUrl>[0]

describe('getVkPhotosUrl', () => {
	describe('поиск подходящего размера', () => {
		it('возвращает "r", если он есть', () => {
			expect(getVkPhotosUrl(sizes({ type: 'r', url: 'huge.jpg' }))).toBe(
				'huge.jpg'
			)
		})

		it('возвращает "x", если он есть', () => {
			expect(getVkPhotosUrl(sizes({ type: 'x', url: 'big.jpg' }))).toBe(
				'big.jpg'
			)
		})

		it('возвращает "r" приоритетно', () => {
			expect(
				getVkPhotosUrl(
					sizes(
						{ type: 'm', url: 'small.jpg' },
						{ type: 'x', url: 'big.jpg' },
						{ type: 'r', url: 'huge.jpg' }
					)
				)
			).toBe('huge.jpg')
		})
	})

	describe('отсутствие подходящего размера', () => {
		it('возвращает "" для пустого массива', () => {
			expect(getVkPhotosUrl(sizes())).toBe('')
		})

		it('возвращает "" если нет ни "r", ни "x"', () => {
			expect(
				getVkPhotosUrl(
					sizes(
						{ type: 's', url: 'tiny.jpg' },
						{ type: 'm', url: 'medium.jpg' }
					)
				)
			).toBe('')
		})
	})

	describe('регистр типов', () => {
		it('не считает "X" (заглавную) подходящим типом', () => {
			expect(getVkPhotosUrl(sizes({ type: 'X', url: 'big.jpg' }))).toBe('')
		})

		it('не считает "R" (заглавную) подходящим типом', () => {
			expect(getVkPhotosUrl(sizes({ type: 'R', url: 'huge.jpg' }))).toBe('')
		})
	})

	describe('чистота функции', () => {
		it('не мутирует входной массив', () => {
			const input = [
				{ type: 'm', url: 'small.jpg' },
				{ type: 'x', url: 'big.jpg' },
			] as unknown as Parameters<typeof getVkPhotosUrl>[0]
			const snapshot = JSON.parse(JSON.stringify(input))

			getVkPhotosUrl(input)

			expect(input).toEqual(snapshot)
		})

		it('идемпотентна при повторном вызове', () => {
			const input = sizes({ type: 'x', url: 'big.jpg' })

			expect(getVkPhotosUrl(input)).toBe(getVkPhotosUrl(input))
		})
	})
})
