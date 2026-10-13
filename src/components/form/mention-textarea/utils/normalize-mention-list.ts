import { MentionSuggest } from 'components/form/mention-textarea/types'

/**
 * Отрезает всё не буквы и не цифры из строки
 */
const clearName = (name: string): string =>
	name.replace(/[^\p{L}\p{N}]/gui, '').toLowerCase()

/**
 * Выдаёт наружу очищенные от фигурных скобок данные
 */
export const normalizeMentionList = (list: string[], filtredSuggestList: MentionSuggest[]): MentionSuggest[] => {
	let result: MentionSuggest[] = []
	for (let mention of list) {
		for (const suggestItem of filtredSuggestList) {
			if (clearName(suggestItem.display) === clearName(mention)) {
				result.push(suggestItem)
			}
		}
	}
	return result
}
