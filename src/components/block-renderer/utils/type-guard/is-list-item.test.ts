import { ListItemBlock } from 'components/block-renderer/types'

import { isListItem } from 'components/block-renderer/utils/type-guard/is-list-item'

describe('isListItem — type guard утилита BlockRenderer', () => {
	it('возвращает true для ListItem', () => {
		const item: ListItemBlock = { text: 'test' }
		expect(isListItem(item)).toBe(true)
	})

	it('возвращает false для strings', () => {
		expect(isListItem('just string')).toBe(false)
	})

	it('возвращает false для других объектов без поля text', () => {
		expect(isListItem({ foo: 'bar' } as any)).toBe(false)
	})
})
