import { describe, it, expect } from 'vitest';
import { filterTagAnyStrategy } from './filterTagAnyStrategy';
import { DataItemWithTags, SelectedTags } from './types';

describe('[Стратегия фильтрации] filterTagAnyStrategy', () => {
	const mockData: DataItemWithTags[] = [
		{ id: 1, name: 'футболка',  tags: ['белый',  'XS',  'шелк'] },
		{ id: 2, name: 'свитер',    tags: ['синий',  'XL',  'шерсть'] },
		{ id: 3, name: 'шорты',     tags: ['белый',  'XL',  'джинса'] },
		{ id: 4, name: 'штаны',     tags: ['черный', 'M',   'шелк'] },
		{ id: 5, name: 'водолазка', tags: ['белый',  'M',   'шерсть'] },
		{ id: 6, name: 'кофта',     tags: ['синий',  'XS',  'джинса'] },
		{ id: 7, name: 'майка',     tags: ['желтый', 'XXL', 'лён'] },
	];

	describe('Одна группа (OR логика)', () => {
		it('фильтрует по одному тегу в группе', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(3);
			expect(result.map(item => item.id)).toEqual([1, 3, 5]);
		});

		it('фильтрует по нескольким тегам в группе', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(5);
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6]);
		});

		it('возвращает, если есть хотя бы один тег из группы', () => {
			const selectedTags: SelectedTags = {
				size: new Set(['XS', 'M']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(4);
			expect(result.map(item => item.id)).toEqual([1, 4, 5, 6]);
		});

		it('возвращает пустой массив, если нет совпадений', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['purple']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toEqual([]);
		});
	});

	describe('Несколько групп (OR по всем тегам из всех групп)', () => {
		it('выбирает из двух групп', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['XL']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(4);
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5]);
		});

		it('должен игнорировать пустые группы', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set<string>(),
				material: new Set<string>(),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(3);
			expect(result.map(item => item.id)).toEqual([1, 3, 5]);
		});

		it('отрабатывает дублирующиеся теги', () => {
			const selectedTags: SelectedTags = {
				group1: new Set(['белый']),
				group2: new Set(['белый']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(3);
			expect(result.map(item => item.id)).toEqual([1, 3, 5]);
		});
	});

	describe('OR логика внутри группы с несколькими тегами', () => {
		it('должен находить элементы, содержащие любой из тегов в группе', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
				size: new Set(['XS', 'XL']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(5);
			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6]);
		});

		it('отрабатывает перекрывающиеся теги', () => {
			const dataWithOverlap: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: ['белый', 'XS'] },
				{ id: 2, name: 'свитер', tags: ['белый', 'XL'] },
			];

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				size: new Set(['XS']),
			};

			const result = filterTagAnyStrategy(dataWithOverlap, selectedTags);

			expect(result).toHaveLength(2);
			expect(result.map(item => item.id)).toEqual([1, 2]);
		});
	});

	describe('Граничные случаи', () => {
		it('возвращает пустой массив, если нет выбранных тегов', () => {
			const selectedTags: SelectedTags = {
				color: new Set<string>(),
				size: new Set<string>(),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toEqual([]);
		});

		it('возвращает пустой массив, если нет выбранных тегов', () => {
			const result = filterTagAnyStrategy(mockData, {});

			expect(result).toEqual([]);
		});

		it('возвращает пустой массив, если все Set пустые', () => {
			const selectedTags: SelectedTags = {
				color: new Set<string>(),
				size: new Set<string>(),
				material: new Set<string>(),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toEqual([]);
		});

		it('возвращает пустой массив, если данные пусты', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAnyStrategy([], selectedTags);

			expect(result).toEqual([]);
		});

		it('должен корректно обрабатывать элементы без тегов', () => {
			const dataWithEmptyTags: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: [] },
				{ id: 2, name: 'свитер', tags: ['белый'] },
				{ id: 3, name: 'шорты', tags: [] },
			];

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAnyStrategy(dataWithEmptyTags, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(2);
		});

		it('должен корректно обрабатывать элементы с null или undefined (если такие могут быть)', () => {
			const dataWithNullTags = [
				{ id: 1, name: 'футболка', tags: null },
				{ id: 2, name: 'свитер', tags: ['белый'] },
				{ id: 3, name: 'шорты', tags: undefined },
			] as any[];

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAnyStrategy(dataWithNullTags, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0].id).toBe(2);
		});

		it('должен сохранять порядок элементов', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый', 'синий']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result.map(item => item.id)).toEqual([1, 2, 3, 5, 6]);
		});

		it('не должен мутировать исходные данные', () => {
			const originalData = [...mockData];
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			filterTagAnyStrategy(mockData, selectedTags);

			expect(mockData).toEqual(originalData);
		});

		it('отрабатывает большое количество групп', () => {
			const manyGroups: Record<string, Set<string>> = {};
			for (let i = 0; i < 100; i++) {
				manyGroups[`group_${i}`] = new Set([`tag_${i}`]);
			}

			const singleItem: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: ['tag_50'] },
			];

			const result = filterTagAnyStrategy(singleItem, manyGroups);

			expect(result).toHaveLength(1);
		});

		it('отрабатывает миллион тегов в элементе', () => {
			const manyTags = Array.from({ length: 1000000 }, (_, i) => `tag_${i}`);
			const data: DataItemWithTags[] = [
				{ id: 1, name: 'футболка', tags: manyTags },
			];

			const selectedTags: SelectedTags = {
				group: new Set(['tag_999999']),
			};

			const result = filterTagAnyStrategy(data, selectedTags);

			expect(result).toHaveLength(1);
		});

		it('не дублирует элементы в результате', () => {
			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
				material: new Set(['шелк']),
			};

			const result = filterTagAnyStrategy(mockData, selectedTags);

			expect(result).toHaveLength(4);
			expect(result.map(item => item.id)).toEqual([1, 3, 4, 5]);
		});
	});
});
