import { describe, expect, it } from 'vitest'

import { linkify } from 'utils/text/linkify'

describe('linkify', () => {
	describe('когда URL нет', () => {
		it('возвращает обычный текст без изменений', () => {
			expect(linkify('просто текст')).toBe('просто текст')
		})

		it('возвращает пустую строку как есть', () => {
			expect(linkify('')).toBe('')
		})

		it('не трогает "www.higimo.ru" без протокола', () => {
			expect(linkify('см. www.higimo.ru')).toBe('см. www.higimo.ru')
		})

		it('не трогает "ftp://" и другие схемы', () => {
			expect(linkify('ftp://higimo.ru')).toBe('ftp://higimo.ru')
		})

		it('не трогает "httpx://" (не http/https)', () => {
			expect(linkify('httpx://higimo.ru')).toBe('httpx://higimo.ru')
		})
	})

	describe('базовые замены', () => {
		it('оборачивает одиночный URL в <a>', () => {
			expect(linkify('https://higimo.ru')).toBe(
				'<a href="https://higimo.ru/">higimo.ru/</a>'
			)
		})

		it('заменяет несколько URL', () => {
			expect(linkify('a https://a.com b http://b.org')).toBe(
				'a <a href="https://a.com/">a.com/</a> b <a href="http://b.org/">b.org/</a>'
			)
		})

		it.skip('сохраняет окружающий текст и знаки препинания', () => {
			expect(linkify('См. https://higimo.ru, и всё.')).toBe(
				'См. <a href="https://higimo.ru/">higimo.ru/</a>, и всё.'
			)
		})
	})

	describe('формирование label', () => {
		it('в label попадает host + pathname без протокола', () => {
			expect(linkify('https://higimo.ru/path')).toBe(
				'<a href="https://higimo.ru/path">higimo.ru/path</a>'
			)
		})

		it('query-string остаётся в href, но не в label', () => {
			const result = linkify('https://higimo.ru/p?x=1&y=2')

			expect(result).toContain('href="https://higimo.ru/p?x=1&y=2"')
			expect(result).toContain('>higimo.ru/p</a>')
		})

		it('хэш остаётся в href, но не в label', () => {
			const result = linkify('https://higimo.ru/p#section')

			expect(result).toContain('href="https://higimo.ru/p#section"')
			expect(result).toContain('>higimo.ru/p</a>')
		})

		it('для корневого URL label содержит "/"', () => {
			expect(linkify('https://higimo.ru')).toContain('>higimo.ru/</a>')
		})

		it('для URL с портом порт попадает в label (часть host)', () => {
			expect(linkify('https://higimo.ru:8080/p')).toContain(
				'>higimo.ru:8080/p</a>'
			)
		})

		it('для URL с поддоменом поддомен попадает в label', () => {
			expect(linkify('https://api.higimo.ru/v1/users')).toBe(
				'<a href="https://api.higimo.ru/v1/users">api.higimo.ru/v1/users</a>'
			)
		})
	})

	describe('границы совпадения', () => {
		it('останавливается на пробеле', () => {
			expect(linkify('https://a.com https://b.com')).toBe(
				'<a href="https://a.com/">a.com/</a> <a href="https://b.com/">b.com/</a>'
			)
		})

		it('останавливается на переводе строки', () => {
			const result = linkify('https://a.com\nhttps://b.com')

			expect(result).toContain('<a href="https://a.com/">')
			expect(result).toContain('<a href="https://b.com/">')
		})

		it('останавливается на двойной кавычке', () => {
			expect(linkify('"https://a.com"')).toBe(
				'"<a href="https://a.com/">a.com/</a>"'
			)
		})

		it('останавливается на одинарной кавычке', () => {
			expect(linkify("'https://a.com'")).toBe(
				"'<a href=\"https://a.com/\">a.com/</a>'"
			)
		})

		it('останавливается на открывающем угловом теге', () => {
			expect(linkify('https://a.com<b>')).toBe(
				'<a href="https://a.com/">a.com/</a><b>'
			)
		})

		it('включает хвостовые знаки препинания (запятые, точки, скобки) в URL', () => {
			const result = linkify('См. https://a.com/path.')

			expect(result).toContain('href="https://a.com/path."')
		})
	})

	describe('невалидные URL', () => {
		it('возвращает совпадение как есть, если new URL падает', () => {
			expect(linkify('http://')).toBe('http://')
		})

		it('не ломает строку при невалидном URL среди текста', () => {
			expect(linkify('a http:// b')).toBe('a http:// b')
		})
	})

	describe('чистота функции', () => {
		it('не мутирует исходную строку (контракт)', () => {
			const input = 'https://a.com'
			const output = linkify(input)

			expect(input).toBe('https://a.com')
			expect(output).not.toBe(input)
		})

		it.skip('не умеет игнорировать уже существующие html-ссылки', () => {
			const once = linkify('https://a.com')
			const twice = linkify(once)

			expect(twice).toBe('once')
		})
	})
})
