import { Brand, Code } from 'utils.type'

type ListItemId     = Brand<number, 'ListItemId'>
type ListPropertyId = Brand<number, 'ListPropertyId'>
type ListValueId    = Brand<number, 'ListValueId'>

export type ListerProperty = {
	id: ListValueId
	name: string
	type: string
	item: number
}

export type ListerValue = {
	id: number
	value: string
	property: number
	item: number
}

export type ListPropertyType = {
	id: ListPropertyId
	item_id: number
	property_id: ListPropertyId
	value: string
	property: {
		id: ListItemId
		item_id: number
		name: string
		type: string
	}
}

export type ListerItem = {
	id: ListItemId
	parent_id: ListItemId
	title: string
	code: Code
	created_at: number
	children?: ListerItem[]
	parent?: ListerItem
	values?: ListPropertyType[]
}

// TODO: [LIGHT] rename IerarhListType
export type ListListType = ListerItem & {
	child?: ListerItem[]
}
