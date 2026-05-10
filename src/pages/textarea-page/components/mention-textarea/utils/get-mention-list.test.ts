import { describe, it, expect } from 'vitest'
import { getMentionList } from './get-mention-list'

describe('getMentionList', () => {
	describe('валидные символы в упоминаниях', () => {
		it('поддерживает латиницу', () => {
			const result = getMentionList('@{username}')
			expect(result).toEqual(['username'])
		})

		it('поддерживает кириллицу', () => {
			const result = getMentionList('@{пользователь}')
			expect(result).toEqual(['пользователь'])
		})

		it('поддерживает букву "ё" и "Ë"', () => {
			const result = getMentionList('@{ёжик} и @{Ëлка}')
			expect(result).toEqual(['ёжик', 'Ëлка'])
		})

		it('поддерживает цифры', () => {
			const result = getMentionList('@{user123}')
			expect(result).toEqual(['user123'])
		})

		it('поддерживает дефис и подчеркивание', () => {
			const result = getMentionList('@{user-name} и @{user_name}')
			expect(result).toEqual(['user-name', 'user_name'])
		})

		it('поддерживает пробелы', () => {
			const result = getMentionList('@{Имя Фамилия}')
			expect(result).toEqual(['Имя Фамилия'])
		})

		it('поддерживает неразрывные пробелы', () => {
			const result = getMentionList('@{Имя Фамилия}')
			expect(result).toEqual(['Имя Фамилия'])
		})
	})

	describe('ограничения длины', () => {
		it('поддерживает упоминания в 1 символ', () => {
			const result = getMentionList('@{a}')
			expect(result).toEqual(['a'])
		})

		it('поддерживает упоминания в 25 символов', () => {
			const longName = 'a'.repeat(25)
			const result = getMentionList(`@{${longName}}`)
			expect(result).toEqual([longName])
		})

		it('игнорирует упоминания длиннее 25 символов', () => {
			const longName = 'a'.repeat(26)
			const result = getMentionList(`@{${longName}}`)
			expect(result).toEqual([])
		})
	})

	describe('невалидные форматы', () => {
		it('игнорирует упоминания без @', () => {
			const result = getMentionList('{username}')
			expect(result).toEqual([])
		})

		it('игнорирует упоминания без фигурных скобок', () => {
			const result = getMentionList('@username')
			expect(result).toEqual([])
		})

		it('игнорирует пустые фигурные скобки', () => {
			const result = getMentionList('@{}')
			expect(result).toEqual([])
		})

		it('игнорирует неполные скобки', () => {
			const result1 = getMentionList('@{username')
			const result2 = getMentionList('@username}')

			expect(result1).toEqual([])
			expect(result2).toEqual([])
		})
	})

	describe('обработка пробелов', () => {
		it('поддерживает упоминания в начале строки', () => {
			const result = getMentionList('@{start} text')
			expect(result).toEqual(['start'])
		})

		it('поддерживает упоминания после пробелов', () => {
			const result = getMentionList('text @{middle} text')
			expect(result).toEqual(['middle'])
		})

		it('поддерживает упоминания после табуляции', () => {
			const result = getMentionList('text\t@{tabbed}')
			expect(result).toEqual(['tabbed'])
		})

		it('игнорируе упоминания внутри слов', () => {
			const result = getMentionList('user@{inside}name')
			expect(result).toEqual([])
		})
	})

	describe('крайние случаи', () => {
		it('извлекает одно упоминание', () => {
			const result = getMentionList('Привет @{username}')
			expect(result).toEqual(['username'])
		})

		it('извлекает несколько упоминаний', () => {
			const result = getMentionList('@{user1} и @{user2} и @{user3}')
			expect(result).toEqual(['user1', 'user2', 'user3'])
		})

		it('игнорирует дубликаты', () => {
			const result = getMentionList('@{admin} @{admin} @{admin}')
			expect(result).toEqual(['admin'])
		})

		it('возвращает пустой массив, если нет упоминаний', () => {
			const result = getMentionList('Обычный текст без упоминаний')
			expect(result).toEqual([])
		})

		it('поддерживает пустую строку', () => {
			const result = getMentionList('')
			expect(result).toEqual([])
		})

		it('поддерживает строку только с @', () => {
			const result = getMentionList('@')
			expect(result).toEqual([])
		})

		it('поддерживает смешанные валидные и невалидные упоминания', () => {
			const text = '@{valid} @invalid @{also-valid} {not-valid}'
			const result = getMentionList(text)
			expect(result).toEqual(['valid', 'also-valid'])
		})

		it('сохраняет регистр символов', () => {
			const result = getMentionList('@{UserName} @{USERNAME} @{username}')
			expect(result).toEqual(['UserName', 'USERNAME', 'username'])
		})
	})
})
