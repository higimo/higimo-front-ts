import { TagCategory } from 'types'
import { ACCORD_TOTAL_TAGS } from 'dic/accord/ACCORD_TOTAL_TAGS'

export const ACCORD_TAG_CATEGORY = [
	{
		group: {
			id: 1,
			title: 'Основной',
		},
		tags: Object.values(ACCORD_TOTAL_TAGS).map((tagName, index) => ({
			id: index,
			title: tagName
		}))
	},
] as const satisfies readonly TagCategory[]

