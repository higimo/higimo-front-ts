import { Brand, Code } from 'utils.type'

type AccordId = Brand<number, 'AccordId'>

export type AccordType = {
	id: AccordId
	name: string
	code: Code
	text: string
	view: number
}

export type AccordWithTagType = AccordType & {
	isNew: boolean
	isMostView: boolean
}

type AccordTagType = {
	id: number
	label: string
}

export type AccordRealTagType = AccordType & {
	tags: AccordTagType[]
}
