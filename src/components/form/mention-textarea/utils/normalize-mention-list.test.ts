import { describe, it, expect } from 'vitest'

import { normalizeMentionList } from 'components/form/mention-textarea/utils/normalize-mention-list'

import { MentionSuggest } from 'components/form/mention-textarea/types'

const makeMentionSuggest = ({ id = 1, display = 'username' }): MentionSuggest => {
	return {
		id: id as MentionSuggest['id'],
		display,
		person: {
			id: id as MentionSuggest['id'],
			name: display,
			alias: display,
			nick: display,
			description: '',
		}
	}
}

describe('normalizeMentionList', () => {
	describe('очистка формата упоминаний', () => {
		it('Игнорирует не буквы и не числа при сравнении', () => {
			const list = [
				'@{username}',
				'john_doe',
				'john_doe_smith',
				'Dr._John_Doe',
			]
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'username' }),
				makeMentionSuggest({ display: 'john doe' }),
				makeMentionSuggest({ display: 'john doe smith' }),
				makeMentionSuggest({ display: 'Dr. John Doe' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result[0]).toBe(filtredSuggestList[0])
			expect(result[1]).toBe(filtredSuggestList[1])
			expect(result[2]).toBe(filtredSuggestList[2])
			expect(result[3]).toBe(filtredSuggestList[3])
		})
	})

	describe('поиск соответствий', () => {
		it('игнорирует регистр', () => {
			const list = ['@{USERNAME}']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'username' })
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result[0]).toBe(filtredSuggestList[0])
		})

		it('игнорирует упоминания, которых нет в списке предложений', () => {
			const list = [
				'@{unknown_user}',
				'@@{invalid}',
				'@{nonexistent}'
			]
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'existing user' })
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toEqual([])
		})

		it('игнорирует несовпадающие упоминания', () => {
			const list = ['@{john_doe}', '@{unknown}', '@{jane_smith}']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'john doe' }),
				makeMentionSuggest({ display: 'jane smith' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toHaveLength(2)
			expect(result[0]?.display).toBe('john doe')
			expect(result[1]?.display).toBe('jane smith')
		})

		it('сохраняет порядок', () => {
			const list = ['@{user3}', '@{user1}', '@{user2}']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ id: 1, display: 'user1' }),
				makeMentionSuggest({ id: 2, display: 'user2' }),
				makeMentionSuggest({ id: 3, display: 'user3' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result[0]?.id).toBe(3)
			expect(result[1]?.id).toBe(1)
			expect(result[2]?.id).toBe(2)
		})
	})

	describe('крайние случаи', () => {
		it('возвращает пустой массив при пустом списке упоминаний', () => {
			const list: string[] = []
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'user1' }),
				makeMentionSuggest({ display: 'user2' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toEqual([])
		})

		it('возвращает пустой массив при пустом списке предложений', () => {
			const list = ['@{user1}', '@{user2}']
			const filtredSuggestList: MentionSuggest[] = []

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toEqual([])
		})

		it('находит соответствие по display имени', () => {
			const list = ['@{john_doe}']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'john doe' }),
				makeMentionSuggest({ display: 'jane smith' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toHaveLength(1)
			expect(result[0]).toEqual(filtredSuggestList[0])
		})

		it('обрабатывает пустые строки в списке', () => {
			const list = ['', '@{user1}', '']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'user1' })
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toHaveLength(1)
			expect(result[0]?.display).toBe('user1')
		})

		it('обрабатывает специальные символы в упоминаниях', () => {
			const list = ['@{user@name.ru}', '@{user#name}', '@{name$family}']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'user@name.ru' }),
				makeMentionSuggest({ display: 'user#name' }),
				makeMentionSuggest({ display: 'name$family' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toHaveLength(3)
			expect(result[0]?.display).toBe('user@name.ru')
			expect(result[1]?.display).toBe('user#name')
			expect(result[2]?.display).toBe('name$family')
		})

		it('Путается в одинаковых именах', () => {
			const list = ['Виктор Петров']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ id: 1, display: 'Виктор Петров' }),
				makeMentionSuggest({ id: 2, display: 'Виктор Петров' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toHaveLength(2)
			expect(result[0]).toEqual(filtredSuggestList[0])
			expect(result[1]).toEqual(filtredSuggestList[1])
		})

		it('обрабатывает очень длинные упоминания', () => {
			const longName = 'a'.repeat(100)
			const list = [`@{${longName}}`]
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: longName })
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result).toHaveLength(1)
			expect(result[0]?.display).toBe(longName)
		})

		it('возвращает дубликаты, если они есть в исходном списке', () => {
			const list = ['@{user1}', '@{user1}', '@{user2}']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'user1' }),
				makeMentionSuggest({ display: 'user2' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			// Возвращает дубликаты (как в реализации)
			expect(result).toHaveLength(3)
			expect(result[0]?.display).toBe('user1')
			expect(result[1]?.display).toBe('user1')
			expect(result[2]?.display).toBe('user2')
		})

		it('должна сохранять все поля объекта MentionSuggest', () => {
			const list = ['@{user1}']
			const filtredSuggestList: MentionSuggest[] = [
				makeMentionSuggest({ display: 'user1' }),
			]

			const result = normalizeMentionList(list, filtredSuggestList)

			expect(result[0]).toEqual(filtredSuggestList[0])
		})
	})

	it('Проверка на реальных данных', () => {
		const list = [
			'id_ivbrv99',
			'CTO_Таймпада',
			'HR_СБЕР_|_QuipKatya',
			'dimboxer@gmail.com',
			'HR_Тбанка_|_hr_tbank',
		]
		const filtredSuggestList: MentionSuggest[] = [
			makeMentionSuggest({ display: 'id_ivbrv99' }),
			makeMentionSuggest({ display: 'CTO Таймпада' }),
			makeMentionSuggest({ display: 'HR СБЕР | QuipKatya' }),
			makeMentionSuggest({ display: 'dimboxer@gmail.com' }),
			makeMentionSuggest({ display: 'HR Тбанка | HR tbank' }),
		]

		const result = normalizeMentionList(list, filtredSuggestList)

		expect(result[0]).toEqual(filtredSuggestList[0])
		expect(result[1]).toEqual(filtredSuggestList[1])
		expect(result[2]).toEqual(filtredSuggestList[2])
		expect(result[3]).toEqual(filtredSuggestList[3])
		expect(result[4]).toEqual(filtredSuggestList[4])
	})
})
