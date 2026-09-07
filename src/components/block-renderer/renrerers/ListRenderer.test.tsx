import type { ListBlock } from '../types'

import { render, screen } from '@testing-library/preact'

import { ListRenderer } from './ListRenderer'

describe('ListRenderer', () => {

	describe('строчные items', () => {
		const block: ListBlock = {
			type: 'list',
			ordered: false,
			items: ['First <b>item</b>', 'Second item', 'Third item'],
		}

		it('рендерит ненумерованный список по умолчанию', () => {
			render(<ListRenderer {...block} />)
			expect(screen.getByRole('list')).toBeInTheDocument()
			expect(screen.getByRole('list').tagName).toBe('UL')
		})

		it('рендерит нумерованный список', () => {
			render(<ListRenderer {...block} ordered={true} />)
			expect(screen.getByRole('list').tagName).toBe('OL')
		})

		it('рендерит все дочерние элементы', () => {
			render(<ListRenderer {...block} />)
			const items = screen.getAllByRole('listitem')
			expect(items).toHaveLength(3)
		})

		it('поддерживает ОПАСНЫЙ HTML внутри элемента', () => {
			render(<ListRenderer {...block} />)
			const firstItem = screen.getAllByRole('listitem')[0]
			expect(firstItem?.innerHTML).toContain('<b>item</b>')
		})

		it('не рендерит списка, когда нет items', () => {
			const emptyBlock = { ...block, items: [] }
			const { container } = render(<ListRenderer {...emptyBlock} />)
			expect(container.firstChild).toBeNull()
		})
	})

	describe('сложные ListItem с вложенными списками', () => {
		const nestedBlock: ListBlock = {
			type: 'list',
			ordered: false,
			items: [
				{
					text: 'Parent <i>item</i>',
					children: [
						{
							type: 'list',
							ordered: true,
							items: ['<b>Child 1</b>', 'Child 2'],
						},
					],
				},
				{
					text: 'Another parent',
				},
			],
		}

		it('рендерит ненумерованный список', () => {
			render(<ListRenderer {...nestedBlock} />)
			const lists = screen.getAllByRole('list')
			expect(lists).toHaveLength(2)
			expect(lists[0]?.tagName).toBe('UL')
		})

		it('рендерит вложенный нумерованный список', () => {
			render(<ListRenderer {...nestedBlock} />)
			const lists = screen.getAllByRole('list')
			const nestedList = lists[1]
			expect(nestedList?.tagName).toBe('OL')
		})

		it('рендерит текст с ОПАСНЫМ HTML в родительском и дочернем элементах', () => {
			render(<ListRenderer {...nestedBlock} />)
			const parentItem = screen.getAllByRole('listitem')[0]
			expect(parentItem?.innerHTML).toContain('<i>item</i>')
			expect(parentItem?.innerHTML).toContain('<b>Child 1</b>')
		})

		it('рендерит дочерний список', () => {
			render(<ListRenderer {...nestedBlock} />)
			const allItems = screen.getAllByRole('listitem')
			expect(allItems).toHaveLength(4)
			expect(allItems[1]).toHaveTextContent('Child 1')
			expect(allItems[2]).toHaveTextContent('Child 2')
		})
	})

})
