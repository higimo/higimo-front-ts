import { Brand, Code, DateOnlyString } from "utils.type"

type PortfolioId              = Brand<number, 'PortfolioId'>
type PortfolioTagId           = Brand<number, 'PortfolioTagId'>
type PortfolioTagGroupId      = Brand<number, 'PortfolioTagGroupId'>
export type PortfolioWorkerId = Brand<number, 'PortfolioWorkerId'>
type PortfolioVendorId        = Brand<number, 'PortfolioVendorId'>
export type PortfolioProjectId = Brand<number, 'PortfolioProjectId'>

// TODO: [BACKEND] после передачи количества в count, можно будет избавиться от типа
export type PortfolioIdsType = {
	id: PortfolioId
	vendor: number
	code: Code
}
export type PortfolioTag = {
	id: PortfolioTagId
	title: string
}
export type PortfolioGroupTagType = {
	id: PortfolioTagGroupId
	title: string
}
export type PortfolioGroupedTagType = {
	group: PortfolioGroupTagType
	tags: PortfolioTag[]
}
export type PortfolioWorkerType = {
	id: PortfolioWorkerId
	full_name: string
	login: string
	company: string
	image: null
	role: string
	link?: string
}
export type PortfolioCreditsType = {
	role: string
	worker: PortfolioWorkerType
}
export type PortfolioVendorType = {
	id: PortfolioVendorId
	code: Code
	title: string
	description?: string
}
export type PortfolioProjectSimpleType = {
	id: PortfolioProjectId
	vendor_id: number
	vendor: PortfolioVendorType
	name: string
	code: string
	date: DateOnlyString
	image: 'png' | 'jpg'
	cover_size: 'high' | 'big' | 'normal' | 'small'
	isLink: boolean
	link?: string
}
export type PortfolioProjectFullType = PortfolioProjectSimpleType & {
	tags: PortfolioTag[]
	description?: string
}
export type PortfolioProjectDetailType = PortfolioProjectSimpleType & {
	tags: PortfolioTag[]
	credits: PortfolioCreditsType[]
	description?: string
	text: string
	// TODO: [BACKEND] бекенд Вот бы добавить следующий и предыдущий кейс
	// next: PortfolioProjectApiType
	// prev: PortfolioProjectApiType
}
export type PortfolioProjectTableType = PortfolioProjectDetailType
