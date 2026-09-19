import { DataItemWithTags, SelectedTags } from 'types'

import { describe, it, expect } from 'vitest'
import { filterTagAnyStrategy } from './filter-tag-any-strategy'

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


describe('[Стратегия фильтрации] filterTagAnyStrategy', () => {
	const mockData: DataItemWithTags[] = [
		{ id: 1, name: 'футболка',  tags: [tags['белый'],  tags['XS'],  tags['шелк']] },
		{ id: 2, name: 'свитер',    tags: [tags['синий'],  tags['XL'],  tags['шерсть']] },
		{ id: 3, name: 'шорты',     tags: [tags['белый'],  tags['XL'],  tags['джинса']] },
		{ id: 4, name: 'штаны',     tags: [tags['черный'], tags['M'],   tags['шелк']] },
		{ id: 5, name: 'водолазка', tags: [tags['белый'],  tags['M'],   tags['шерсть']] },
		{ id: 6, name: 'кофта',     tags: [tags['синий'],  tags['XS'],  tags['джинса']] },
		{ id: 7, name: 'майка',     tags: [tags['желтый'], tags['XXL'], tags['лён']] },
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
				{ id: 1, name: 'футболка', tags: [tags['белый'], tags['XS']] },
				{ id: 2, name: 'свитер', tags: [tags['белый'], tags['XL']] },
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
				{ id: 2, name: 'свитер', tags: [tags['белый']] },
				{ id: 3, name: 'шорты', tags: [] },
			];

			const selectedTags: SelectedTags = {
				color: new Set(['белый']),
			};

			const result = filterTagAnyStrategy(dataWithEmptyTags, selectedTags);

			expect(result).toHaveLength(1);
			expect(result[0]?.id).toBe(2);
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
				{ id: 1, name: 'футболка', tags: [{ id: 50, title: 'tag_50' }] },
			];

			const result = filterTagAnyStrategy(singleItem, manyGroups);

			expect(result).toHaveLength(1);
		});

		it('отрабатывает миллион тегов в элементе', () => {
			const manyTags = Array.from({ length: 1000000 }, (_, i) => ({ id: i, title: `tag_${i}` }));
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
