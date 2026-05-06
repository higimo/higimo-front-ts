export type AccordType = {
	id: number
	name: string
	code: string
	text: string
	view: number
}

export type AccordModeType = AccordType & {
	isNew: boolean
	isMostView: boolean
}
