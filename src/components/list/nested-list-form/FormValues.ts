import { NestedListItemType } from 'api-types/listlist.types'
import { KeyOf } from 'utils.type'

export type FormValues = NestedListItemType

type FormScheme<T extends string> = {
	code: T
	type: string
	input: 'textarea' | 'input'
	title: string
	description?: string
}

// TODO: [HARD] хорошая практика делать фабрику формы
// TODO: [HARD] но с типами беда — если есть лишний, которого нет — не подсветит
export const formScheme: FormScheme<KeyOf<NestedListItemType>>[] = [
	{
		code: 'id',
		type: 'number',
		title: 'ид',
		input: 'input',
	},
	{
		code: 'title',
		type: 'string',
		title: 'Название',
		input: 'textarea',
		description: 'Указав имена с переносом строки, из каждой строки будет создан отдельный айтем'
	},
	{
		code: 'parent_id',
		type: 'number',
		title: 'ид родителя',
		input: 'input',
	},
	{
		code: 'code',
		type: 'string',
		title: 'код',
		input: 'input',
	},
]
