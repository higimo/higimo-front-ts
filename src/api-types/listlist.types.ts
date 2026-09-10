import { Brand, Code } from 'utils.type'

type NestedListItemId     = Brand<number, 'NestedListItemId'>
type NestedListPropertyId = Brand<number, 'NestedListPropertyId'>
type NestedListValueId    = Brand<number, 'NestedListValueId'>

export type NestedListProperty = {
	id: NestedListValueId
	name: string
	type: string
	item: number
}

export type NestedListValue = {
	id: number
	value: string
	property: number
	item: number
}

export type NestedListPropertyType = {
	id: NestedListPropertyId
	item_id: number
	property_id: NestedListPropertyId
	value: string
	property: {
		id: NestedListItemId
		item_id: number
		name: string
		type: string
	}
}

export type NestedListItem = {
	id: NestedListItemId
	parent_id: NestedListItemId
	title: string
	code: Code
	created_at: number
	children?: NestedListItem[]
	parent?: NestedListItem
	values?: NestedListPropertyType[]
}
