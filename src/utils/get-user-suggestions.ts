import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { MentionSuggest } from 'components/mention-textarea/types'

/**
 * Для Нокии
 */
export const getUserSuggestions = (
	persons: NokiaPersonSimpleType[]
): MentionSuggest[] => persons.map(person => {
	return {
		id: person.id,
		display: [person.name, person.alias, person.nick].filter(Boolean).join(' | '),
		person: person
	}
})
