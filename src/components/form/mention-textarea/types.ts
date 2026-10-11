import { NokiaPersonSimpleType } from 'api-types/nokia.types'

export type MentionSuggest = {
	id: NokiaPersonSimpleType['id']
	display: string
	person: NokiaPersonSimpleType
}

export type MetionSelector = {
	text: string
	start: number
	end: number
}
