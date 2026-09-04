import { describe, test, expect } from 'vitest'
import { replaceRenderBlockVariables } from './replace-render-block-variables'

describe('replaceRenderBlockVariables', () => {

	describe('валидные данные', () => {
		test('заменяет строку только из переменной', () => {
			expect(replaceRenderBlockVariables('{%AAA%}', { AAA: 'higimo' })).toBe('higimo')
		})

		test('заменяет строку только из переменной и текста', () => {
			expect(replaceRenderBlockVariables('Привет, {%username%}', { username: 'higimo' })).toBe('Привет, higimo')
		})

		test('Заменяет две переменных', () => {
			expect(replaceRenderBlockVariables('{%name%} {%family%}', { name: 'Дмитрий', family: 'Уткин' })).toBe('Дмитрий Уткин')
		})
	})

	describe('Пограничные случаи', () => {
		test('Строку без переменных оставит как есть', () => {
			expect(replaceRenderBlockVariables('Привет', { name: 'Дмитрий', family: 'Уткин' })).toBe('Привет')
		})

		test('Отработает, если не передали переменные', () => {
			expect(replaceRenderBlockVariables('Привет', {})).toBe('Привет')
		})

		test('Оставит текст с переменной, если её не найдёт', () => {
			expect(replaceRenderBlockVariables('Привет, {%username%}', { family: 'Уткин' })).toBe('Привет, {%username%}')
		})
	})

})
