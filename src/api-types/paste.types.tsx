import { Brand, DateOnlyString } from 'utils.type'

type PasteId = Brand<number, 'TagId'>

export type PasteApiType = {
	id: PasteId
	key: string
	date: DateOnlyString
	content: string
}

export type PasteStatisticApiType = {
	label: DateOnlyString
	value: number
}
