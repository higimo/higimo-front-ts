import { describe, test, expect } from 'vitest'
import { convertFlatListToIerah } from 'components/list/convert-flat-list-to-ierah'
import { ListerItem } from 'api-types/listlist.types'

describe('convertFlatListToIerah', () => {
	test('строит иерархию', () => {
		const input = [
			{ id: 20,                parent: false, title: 'Parent' },
			{ id: 21, parent_id: 20, parent: true,  title: 'Child1' },
			{ id: 22, parent_id: 20, parent: true,  title: 'Child2' },
		] as unknown as ListerItem[];

		const result = convertFlatListToIerah(input);

		// В корне все элементы
		expect(result.length).toBe(3);

		// У родителя два потомка
		const parent = result.find(item => item.id === 20);
		expect(parent).toBeDefined();
		expect(parent?.child).toHaveLength(2);
		expect(parent?.child?.map(c => c.id)).toEqual([21, 22]);

		// У дочерних нет дочек
		const child1 = result.find(item => item.id === 21);
		expect(child1?.child).toEqual([]);
		const child2 = result.find(item => item.id === 22);
		expect(child2?.child).toEqual([]);
	});

	test('возвращает пустоту для пустого входа', () => {
		const result = convertFlatListToIerah([]);
		expect(result).toEqual([]);
	});
});
