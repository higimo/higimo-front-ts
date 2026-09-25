import { NokiaPersonSimpleType } from 'api-types/nokia.types'

export type MentionSuggest = {
	id: NokiaPersonSimpleType['id']
	display: string
	// TODO: [MIDDLE] мб, добавить сюда, удобнее будет подкидывать в добавление формы
	// presons: NokiaPersonSimpleType
}

export type MetionSelector = {
	text: string
	start: number
	end: number
}
