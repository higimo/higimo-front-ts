import { FiledFormPropsType } from 'components/form/filed-form'
import { KeyOf } from 'utils.type'
import { NestedListItemType } from 'api-types/listlist.types'

export type FormValues = NestedListItemType

// TODO: [MIDDLE] распространить
type FormScheme<T extends string> = {
	code: T
	type: FiledFormPropsType['type']
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
	},
	{
		code: 'parent_id',
		type: 'number',
		title: 'ид родителя',
	},
	{
		code: 'title',
		type: 'textarea',
		title: 'Название',
		description: 'Указав имена с переносом строки, из каждой строки будет создан отдельный айтем'
	},
	{
		code: 'code',
		type: 'text',
		title: 'код',
	},
]
