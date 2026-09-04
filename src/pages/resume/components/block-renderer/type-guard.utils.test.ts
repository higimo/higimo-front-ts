import { isListItem } from './type-guard.utils'
import { ListItem } from './types'

describe('BlockRenderer утилиты type guard', () => {

	describe('isListItem', () => {
		it('возвращает true для ListItem', () => {
			const item: ListItem = { text: 'test' }
			expect(isListItem(item)).toBe(true)
		})

		it('возвращает false для strings', () => {
			expect(isListItem('just string')).toBe(false)
		})

		it('возвращает false для других объектов без поля text', () => {
			expect(isListItem({ foo: 'bar' } as any)).toBe(false)
		})
	})

})
