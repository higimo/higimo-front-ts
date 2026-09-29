import { beforeEach, describe, expect, it, vi } from 'vitest'

import { linkify } from 'utils/text/linkify'
import { getShortDescription } from 'utils/text/get-description'

vi.mock('utils/text/linkify', () => ({
	linkify: vi.fn(),
}))


const linkifyMock = vi.mocked(linkify)

describe('getShortDescription', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		// По умолчанию — identity, чтобы изолированно тестировать обрезку/fallback
		linkifyMock.mockImplementation((input: string) => input)
	})

	describe('fallback на пустую строку', () => {
		it('передаёт "" в linkify, если аргумент не передан', () => {
			getShortDescription()

			expect(linkifyMock).toHaveBeenCalledTimes(1)
			expect(linkifyMock).toHaveBeenCalledWith('')
		})

		it('передаёт "" в linkify для пустой строки', () => {
			getShortDescription('')

			expect(linkifyMock).toHaveBeenCalledWith('')
		})

		it('возвращает "" для undefined', () => {
			expect(getShortDescription(undefined)).toBe('')
		})

		it('возвращает "" для пустой строки', () => {
			expect(getShortDescription('')).toBe('')
		})

		it('не подставляет fallback для строки из пробелов (это валидное значение)', () => {
			expect(getShortDescription('   ')).toBe('   ')
			expect(linkifyMock).toHaveBeenCalledWith('   ')
		})
	})

	describe('передача аргумента в linkify', () => {
		it('передаёт исходную строку в linkify без изменений', () => {
			const input = 'Проект на https://example.com'

			getShortDescription(input)

			expect(linkifyMock).toHaveBeenCalledTimes(1)
			expect(linkifyMock).toHaveBeenCalledWith(input)
		})

		it('возвращает результат linkify, если он короче 320 символов', () => {
			linkifyMock.mockReturnValueOnce('linked-result')

			expect(getShortDescription('whatever')).toBe('linked-result')
		})
	})
})

