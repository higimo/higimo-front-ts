import { NestedListItemType } from 'api-types/listlist.types'
import { FormScheme } from 'api-types/form.types'

// TODO: [HARD] распространить практиру делать схему формы
export type FormValues = Partial<NestedListItemType>

export const formScheme: FormScheme<NestedListItemType> = {
	id: {
		type: 'number',
		title: 'ид',
		readonly: true,
	},
	parent_id: {
		type: 'number',
		title: 'ид родителя',
	},
	title: {
		type: 'textarea',
		title: 'Название',
		description: 'Указав имена с переносом строки, из каждой строки будет создан отдельный айтем',
	},
	code: {
		type: 'text',
		title: 'код',
	},
}
