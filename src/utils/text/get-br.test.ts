import { describe, expect, it } from 'vitest'

import { getBr } from 'utils/text/get-br'

describe('getBr', () => {
	describe('замена переводов строки', () => {
		it('заменяет одиночный \\n на <br />', () => {
			expect(getBr('line1\nline2')).toBe('line1<br />line2')
		})

		it('заменяет все вхождения \\n (флаг g)', () => {
			expect(getBr('a\nb\nc\nd')).toBe('a<br />b<br />c<br />d')
		})

		it('заменяет \\n в начале строки', () => {
			expect(getBr('\nhello')).toBe('<br />hello')
		})

		it('заменяет \\n в конце строки', () => {
			expect(getBr('hello\n')).toBe('hello<br />')
		})

		it('заменяет строку из одних \\n', () => {
			expect(getBr('\n\n\n')).toBe('<br /><br /><br />')
		})

		it('заменяет (Windows-переносы)', () => {
			expect(getBr('a\r\nb')).toBe('a<br />b')
		})
	})

	describe('когда заменять нечего', () => {
		it('возвращает строку без \\n без изменений', () => {
			expect(getBr('hello world')).toBe('hello world')
		})

		it('возвращает пустую строку как есть', () => {
			expect(getBr('')).toBe('')
		})

		it('не трогает \\t и другие пробельные символы', () => {
			expect(getBr('a\tb')).toBe('a\tb')
		})
	})

	describe('содержимое строки', () => {
		it('не экранирует HTML-теги', () => {
			// Функция не предназначена для санитайза — это важно зафиксировать
			expect(getBr('<script>\n</script>')).toBe('<script><br /></script>')
		})

		it('не трогает уже существующие <br /> в тексте', () => {
			expect(getBr('a<br />b\nc')).toBe('a<br />b<br />c')
		})

		it('не трогает литерал "\\n" (два символа: бэкслеш и n)', () => {
			expect(getBr('a\\nb')).toBe('a\\nb')
		})

		it('работает с Unicode-строками', () => {
			expect(getBr('привет\nмир 🌍')).toBe('привет<br />мир 🌍')
		})
	})

	describe('чистота функции', () => {
		it('не мутирует исходное значение (строки неизменяемы, но фиксируем контракт)', () => {
			const input = 'a\nb'
			const output = getBr(input)

			expect(input).toBe('a\nb')
			expect(output).toBe('a<br />b')
		})

		it('идемпотентна к повторному применению при отсутствии \\n', () => {
			const once = getBr('a\nb')
			const twice = getBr(once)

			expect(twice).toBe(once)
		})
	})
})
