import { DataItemWithTags, SelectedTags } from 'types'

import { describe, it, expect } from 'vitest'
import { filterTagOrGroupsStrategy } from './filter-tag-or-groups-strategy'

const tags = {
	'белый': { id: 1, title: 'белый' },
	'синий': { id: 1, title: 'синий' },
	'черный': { id: 1, title: 'черный' },
	'желтый': { id: 1, title: 'желтый' },

	'XS': { id: 1, title: 'XS' },
	'XL': { id: 1, title: 'XL' },
	'M': { id: 1, title: 'M' },
	'XXL': { id: 1, title: 'XXL' },

	'шелк': { id: 1, title: 'шелк' },
	'шерсть': { id: 1, title: 'шерсть' },
	'джинса': { id: 1, title: 'джинса' },
	'лён': { id: 1, title: 'лён' },
}



describe('[Стратегия фильтрации] filterTagOrGroupsStrategy', () => {
	const mockData: DataItemWithTags[] = [
		{ id: 1, name: 'футболка',  tags: [tags['белый'],  tags['XS'],  tags['шелк']] },
		{ id: 2, name: 'свитер',    tags: [tags['синий'],  tags['XL'],  tags['шерсть']] },
		{ id: 3, name: 'шорты',     tags: [tags['белый'],  tags['XL'],  tags['джинса']] },
		{ id: 4, name: 'штаны',     tags: [tags['черный'], tags['M'],   tags['шелк']] },
		{ id: 5, name: 'водолазка', tags: [tags['белый'],  tags['M'],   tags['шерсть']] },
		{ id: 6, name: 'кофта',     tags: [tags['синий'],  tags['XS'],  tags['джинса']] },
		{ id: 7, name: 'майка',     tags: [tags['желтый'], tags['XXL'], tags['лён']] },
	]

	describe('Одна группа (OR внутри группы)', () => {
		it('фильтрует по одному тегу в группе', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(3)
			expect(result.map(item => item.id)).toEqual([1, 3, 5])
		})

		it('фильтрует по нескольким тегам в группе', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(5)
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6])
		})

		it('возвращает элементы, где хотя бы один тег из группы', () => {
			const selectedTags: SelectedTags = {
				size: new Set(['XS', 'M']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(4)
			expect(result.map(item => item.id)).toEqual([1, 4, 5, 6])
		})

		it('отбрасывает элементы с пустыми тегами', () => {
			const dataWithEmpty: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: [] },
				{ id: 2, name: 'свитер', tags: [tags['белый']] },
			]

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			}

			const result = filterTagOrGroupsStrategy(dataWithEmpty, selectedTags)

			expect(result).toHaveLength(1)
			expect(result[0]?.id).toBe(2)
		})

		it('возвращает пустой массив, если нет совпадений', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['purple']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toEqual([])
		})
	})

	describe('Несколько групп (OR между группами)', () => {
		it('фильтрует по нескольким группам', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['XL']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(4)
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5])
		})

		it('фильтрует по двум группам', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['синий']),
				material: new Set(['шерсть']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(3)
			expect(result.map(item => item.id)).toEqual([2, 5, 6])
		})

		it('фильтрует по трём группам', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['M']),
				material: new Set(['джинса']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(5)
			expect(result.map(item => item.id)).toEqual([1, 3, 4, 5, 6])
		})

		it('игнорирует пустые группы', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set<string>(),
				material: new Set<string>(),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(3)
			expect(result.map(item => item.id)).toEqual([1, 3, 5])
		})
	})

	describe('OR между тегами и OR между группами', () => {
		it('находит элементы, содержащие любой из тегов в группе', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
				size: new Set(['XS', 'XL']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toHaveLength(5)
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6])
		})

		it('отрабатывает перекрывающие теги', () => {
			const dataWithOverlap: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: [tags['белый'], tags['XS']] },
				{ id: 2, name: 'свитер',   tags: [tags['белый'], tags['XL']] },
				{ id: 3, name: 'шорты',    tags: [tags['синий'], tags['XS']] },
			]

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['XS']),
			}

			const result = filterTagOrGroupsStrategy(dataWithOverlap, selectedTags)

			expect(result).toHaveLength(3)
			expect(result.map(item => item.id)).toEqual([1, 2, 3])
		})
	})

	describe('Граничные случаи', () => {
		it('возвращает все элементы, если нет выбранных тегов', () => {
			const selectedTags: SelectedTags = {
				color: new Set<string>(),
				size: new Set<string>(),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toEqual(mockData)
		})

		it('возвращает все элементы, если передан пустой объект selectedTags', () => {
			const result = filterTagOrGroupsStrategy(mockData, {})

			expect(result).toEqual(mockData)
		})

		it('должен возвращать все элементы, если все Set пустые', () => {
			const selectedTags: SelectedTags = {
				color: new Set<string>(),
				size: new Set<string>(),
				material: new Set<string>(),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toEqual(mockData)
		})

		it('должен возвращать пустой массив, если датасет пуст', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			}

			const result = filterTagOrGroupsStrategy([], selectedTags)

			expect(result).toEqual([])
		})

		it('отрабатывает элементы без тегов', () => {
			const dataWithEmptyTags: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: [] },
				{ id: 2, name: 'свитер', tags: [tags['белый']] },
				{ id: 3, name: 'шорты', tags: [] },
			]

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			}

			const result = filterTagOrGroupsStrategy(dataWithEmptyTags, selectedTags)

			expect(result).toHaveLength(1)
			expect(result[0]?.id).toBe(2)
		})

		it('сохраняет порядок элементов', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6])
		})

		it('не должен мутировать исходные данные', () => {
			const originalData = [...mockData]
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			}

			filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(mockData).toEqual(originalData)
		})

		it('отрабатывает с большим количеством групп', () => {
			const manyGroups: Record<string, Set<string>> = {}
			for (let i = 0; i < 100; i++) {
				manyGroups[`group_${i}`] = new Set([`tag_${i}`])
			}

			const singleItem: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: [{ id: 50, title: 'tag_50' }] },
			]

			const result = filterTagOrGroupsStrategy(singleItem, manyGroups)

			expect(result).toHaveLength(1)
		})

		it('должен возвращать все элементы, если есть пустая группа и нет совпадений в других', () => {
			const selectedTags: SelectedTags = {
				color: new Set<string>(),
				size: new Set(['xxx']),
			}

			const result = filterTagOrGroupsStrategy(mockData, selectedTags)

			expect(result).toEqual([])
		})
	})
})
