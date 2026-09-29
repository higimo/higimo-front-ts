import { describe, expect, it } from 'vitest'

import { getHr } from 'utils/text/get-hr'

describe('getHr', () => {
	describe('замена разделителей', () => {
		it('заменяет одиночный ---- на <hr />', () => {
			expect(getHr('text----text')).toBe('text<hr />text')
		})

		it('заменяет все вхождения ---- (флаг g)', () => {
			expect(getHr('a----b----c----d')).toBe('a<hr />b<hr />c<hr />d')
		})

		it('заменяет ---- в начале строки', () => {
			expect(getHr('----text')).toBe('<hr />text')
		})

		it('заменяет ---- в конце строки', () => {
			expect(getHr('text----')).toBe('text<hr />')
		})

		it('заменяет строку из одних ----', () => {
			expect(getHr('----')).toBe('<hr />')
		})

		it('заменяет подряд идущие ---- без разделителей', () => {
			expect(getHr('--------')).toBe('<hr /><hr />')
		})
	})

	describe('границы совпадения (ровно 4 дефиса)', () => {
		it('не заменяет три дефиса', () => {
			expect(getHr('---')).toBe('---')
		})

		it('не заменяет два дефиса', () => {
			expect(getHr('--')).toBe('--')
		})

		it('не заменяет один дефис', () => {
			expect(getHr('-')).toBe('-')
		})

		it('для пяти дефисов заменяет первые четыре, пятый остаётся', () => {
			expect(getHr('-----')).toBe('<hr />-')
		})

		it('для семи дефисов заменяет первые четыре, остаётся три', () => {
			expect(getHr('-------')).toBe('<hr />---')
		})

		it('для восьми дефисов даёт два разделителя', () => {
			expect(getHr('--------')).toBe('<hr /><hr />')
		})

		it('корректно обрабатывает девять дефисов (два разделителя + остаток)', () => {
			expect(getHr('---------')).toBe('<hr /><hr />-')
		})
	})

	describe('когда заменять нечего', () => {
		it('возвращает строку без ---- без изменений', () => {
			expect(getHr('hello world')).toBe('hello world')
		})

		it('возвращает пустую строку как есть', () => {
			expect(getHr('')).toBe('')
		})

		it('не трогает переводы строк и пробелы', () => {
			expect(getHr('a\n b\tc')).toBe('a\n b\tc')
		})
	})

	describe('содержимое строки', () => {
		it('не экранирует HTML-теги', () => {
			// Функция не предназначена для санитайза — фиксируем контракт
			expect(getHr('<script>----</script>')).toBe('<script><hr /></script>')
		})

		it('не трогает уже существующие <hr /> в тексте', () => {
			expect(getHr('a<hr />b----c')).toBe('a<hr />b<hr />c')
		})

		it('работает с Unicode-строками', () => {
			expect(getHr('привет----мир 🌍')).toBe('привет<hr />мир 🌍')
		})

		it('дефисы внутри слов не считаются разделителем, если их меньше четырёх', () => {
			expect(getHr('well-known')).toBe('well-known')
		})
	})

	describe('чистота функции', () => {
		it('не мутирует исходную строку (строки неизменяемы — фиксируем контракт)', () => {
			const input = 'a----b'
			const output = getHr(input)

			expect(input).toBe('a----b')
			expect(output).toBe('a<hr />b')
		})
	})
})
