export type TagName = string
export type CategoryName = string

export type Tag = {
	id: number
	title: TagName
}

export type TagGroup = {
	id: number
	title: string
}

export type TagCategory = {
	group: TagGroup
	tags: Tag[]
}

/**
 * Тип элемента данных, который содержит теги.
 */
export interface DataItemWithTags {
	tags: Tag[]
	[key: string]: unknown
}

/**
 * Тип для выбранных тегов по группам.
 */
export type SelectedTags = Record<string, Set<string>>

export type FactoidType = {
	digit: number | string
	digitFrom?: string
	description: string
	href?: string
}

type AdventureOptionType = {
	title: string
	value: string
}

export type AdventureType = {
	id: number
	title: string
	description: string
	advent: string
	options: AdventureOptionType[]
	href: string
}

