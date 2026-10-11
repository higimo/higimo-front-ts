import { TAGS_NAME } from 'dic/tourism/TAGS_NAME'
import { TagCategory } from 'types'

export const TOURISM_VISITED_TAG_CATEGORY: TagCategory[] = [
	{
		group: {
			id: 1,
			title: 'Основной',
		},
		tags: TAGS_NAME.map((tagName, index) => ({
			id: index,
			title: tagName
		}))
	},
] as const
