import { describe, expect, it } from 'vitest'
import { getProjectKeys } from 'utils/project/get-project-keys'

describe('getProjectKeys', () => {
	describe('приоритетные ключи', () => {
		it('ставит приоритетные ключи первыми в порядке из priorityKeys', () => {
			const data = { id: 1, name: 'Ann', age: 30, email: 'a@b.c' }

			expect(getProjectKeys(data, ['id', 'email'])).toEqual([
				'id',
				'email',
				'age',
				'name',
			])
		})

		it('игнорирует приоритетные ключи, которых нет в объекте', () => {
			expect(getProjectKeys({ a: 1, b: 2 }, ['z', 'a'])).toEqual(['a', 'b'])
		})

		it('сохраняет порядок приоритетов даже если он не совпадает с порядком в объекте', () => {
			const data = { a: 1, b: 2, c: 3 }

			expect(getProjectKeys(data, ['c', 'a'])).toEqual(['c', 'a', 'b'])
		})

		it('поддерживает один приоритетный ключ', () => {
			expect(getProjectKeys({ b: 1, a: 2 }, ['b'])).toEqual(['b', 'a'])
		})

		it('поддерживает полный список приоритетов на все ключи', () => {
			expect(getProjectKeys({ a: 1, b: 2, c: 3 }, ['b', 'c', 'a'])).toEqual([
				'b',
				'c',
				'a',
			])
		})

		it('дедуплицирует повторяющиеся ключи в priorityKeys через Set', () => {
			expect(getProjectKeys({ a: 1, b: 2 }, ['a', 'a', 'b'])).toEqual(['a', 'b'])
		})
	})

	describe('остальные ключи', () => {
		it('сортирует остальные ключи по алфавиту', () => {
			expect(getProjectKeys({ c: 1, a: 2, b: 3 })).toEqual(['a', 'b', 'c'])
		})

		it('сортирует остальные ключи по Unicode-коду (заглавные идут раньше строчных)', () => {
			expect(getProjectKeys({ b: 1, A: 2, a: 3, B: 4 })).toEqual([
				'A',
				'B',
				'a',
				'b',
			])
		})

		it('сортирует остальные ключи вне зависимости от приоритета', () => {
			expect(getProjectKeys({ z: 1, y: 2, m: 3, a: 4 }, ['m'])).toEqual([
				'm',
				'a',
				'y',
				'z',
			])
		})
	})

	describe('пустые случаи и значения по умолчанию', () => {
		it('возвращает пустой массив для пустого объекта', () => {
			expect(getProjectKeys({})).toEqual([])
		})

		it('работает без второго аргумента (приоритеты по умолчанию [])', () => {
			expect(getProjectKeys({ c: 1, b: 2, a: 3 })).toEqual(['a', 'b', 'c'])
		})

		it('возвращает пустой массив, если приоритеты заданы, но объекта пуст', () => {
			expect(getProjectKeys({}, ['id', 'name'])).toEqual([])
		})

		it('возвращает только приоритетные ключи, если других нет', () => {
			expect(getProjectKeys({ id: 1, name: 2 }, ['id', 'name'])).toEqual([
				'id',
				'name',
			])
		})
	})

	describe('краевые случаи типов', () => {
		it('работает с массивами (ключи — индексы в виде строк)', () => {
			expect(getProjectKeys(['x', 'y', 'z'])).toEqual(['0', '1', '2'])
		})

		it('работает с объектами, у которых есть прототип (берёт только собственные ключи)', () => {
			const proto = { inherited: true }
			const obj = Object.create(proto) as Record<string, unknown>
			obj.own = 1

			expect(getProjectKeys(obj)).toEqual(['own'])
		})

		it('не мутирует исходный объект', () => {
			const data = { c: 1, a: 2, b: 3 }
			const snapshot = { ...data }

			getProjectKeys(data, ['b'])

			expect(data).toEqual(snapshot)
		})

		it('возвращает новый массив (не ссылку на внутренние структуры)', () => {
			const data = { a: 1 }
			const result1 = getProjectKeys(data)
			const result2 = getProjectKeys(data)

			expect(result1).not.toBe(result2)
			expect(result1).toEqual(result2)
		})
	})
})
