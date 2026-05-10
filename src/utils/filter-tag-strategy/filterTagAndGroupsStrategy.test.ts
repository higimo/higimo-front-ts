import { describe, it, expect } from 'vitest'
import { filterTagAndGroupsStrategy } from './filterTagAndGroupsStrategy'
import { DataItemWithTags, SelectedTags } from './types'

describe('[Стратегия фильтрации] filterTagAndGroupsStrategy', () => {
	const mockData: DataItemWithTags[] = [
		{ id: 1, name: 'футболка',  tags: ['белый',  'XS', 'шелк'] },
		{ id: 2, name: 'свитер',    tags: ['синий',  'XL', 'шерсть'] },
		{ id: 3, name: 'шорты',     tags: ['белый',  'XL', 'джинса'] },
		{ id: 4, name: 'водолазка', tags: ['черный', 'M',  'шелк'] },
		{ id: 5, name: 'кофта',     tags: ['белый',  'M',  'шерсть'] },
		{ id: 6, name: 'штаны',     tags: ['синий',  'XS', 'джинса'] },
	];

	describe('Одна группа (OR логика)', () => {
		it('фильтрует по одному тегу', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toHaveLength(3);
			expect(result.map(item => item.id)).toEqual([1, 3, 5]);
		});

		it('фильтрует по нескольким тегам', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toHaveLength(5);
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6]);
		});

		it('возвращает пустой, если нет совпадений', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['purple']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toEqual([]);
		});
	});

	describe('Две группы (AND логика между группами)', () => {
		it('фильтрует по двум группам', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['XS']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(1);
		});

		it('возвращает пустой массив, если нет совпадений', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['purple']),
				size: new Set(['XL']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toEqual([]);
		});

		it('возвращает пустой массив, если нет совпадений в AND', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['черный']),
				size: new Set(['XL']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			// Item 4 - green но medium, не подходит
			expect(result).toEqual([]);
		});

		it('игнорирует группы без выбранных тегов', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set<string>(),
				material: new Set<string>(),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toHaveLength(3);
			expect(result.map(item => item.id)).toEqual([1, 3, 5]);
		});

		it('возвращает пустой массив, если в группе тег вне датасета', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['purple']),
				size: new Set(['XL']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toEqual([]);
		});
	});

	describe('Три и более групп', () => {
		it('фильтрует по трём группам', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['M']),
				material: new Set(['шерсть']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(5);
		});
	});

	describe('Внутри группы OR логика', () => {
		it('фильтрует содержащий любой тег из группы', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
				size: new Set(['XS', 'XL']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toHaveLength(4);
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 6]);
		});
	});

	describe('Граничные случаи', () => {
		it('возвращает пустой массив, если нет выбранных тегов', () => {
			const selectedTags: SelectedTags = {
				color: new Set<string>(),
				size: new Set<string>(),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result).toEqual([]);
		});

		it('возвращает пустой массив, если переданы пустой объект', () => {
			const result = filterTagAndGroupsStrategy(mockData, {});

			expect(result).toEqual([]);
		});

		it('возвращает пустой массив, если фильтровать нечего', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAndGroupsStrategy([], selectedTags);

			expect(result).toEqual([]);
		});

		it('отрабатывает с дублирующимися тегами внутри датасета', () => {
			const dataWithDuplicates: DataItemWithTags[] = [
				{ id: 1, name: 'appple', tags: ['белый', 'белый', 'XS'] },
			];

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['XS']),
			};

			const result = filterTagAndGroupsStrategy(dataWithDuplicates, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(1);
		});

		it('отфильтровывает элементы без тегов', () => {
			const dataWithEmptyTags: DataItemWithTags[] = [
				{ id: 1, name: 'appple', tags: [] },
				{ id: 2, name: 'gold', tags: ['белый'] },
			];

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAndGroupsStrategy(dataWithEmptyTags, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(2);
		});

		it('отрабатывает элементы с тегами null|undefined', () => {
			const dataWithNullTags = [
				{ id: 1, name: 'appple', tags: null },
				{ id: 1, name: 'appple', tags: undefined },
				{ id: 2, name: 'gold', tags: ['белый'] },
			] as any[];

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAndGroupsStrategy(dataWithNullTags, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(2);
		});

		it('сохраняет порядок элементов', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
			};

			const result = filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6]);
		});

		it('не мутирует датасет', () => {
			const originalData = [...mockData];
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			filterTagAndGroupsStrategy(mockData, selectedTags);

			expect(mockData).toEqual(originalData);
		});

		it('работает с большим количеством групп и данных', () => {
			let manyGroups: SelectedTags = {};
			for (let i = 0; i < 250; i++) {
				manyGroups[`group_${i}`] = new Set([`tag_${i}`]);
			}

			const singleItem: DataItemWithTags[] = [
				{ id: 1, name: 'Item 1', tags: Array.from({ length: 300 }, (_, i) => `tag_${i}`) },
			];

			const result = filterTagAndGroupsStrategy(singleItem, manyGroups);

			expect(result).toHaveLength(1);
		});
	});
});
