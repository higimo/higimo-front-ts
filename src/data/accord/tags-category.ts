import { TagCategory } from 'types';
import { totalTags } from '../../dic/accord/tags';


export const ACCORD_TAG_CATEGORY: TagCategory[] = [
	{
		group: {
			id: 1,
			title: 'Основной',
		},
		tags: Object.values(totalTags).map((tagName, index) => ({
			id: index,
			title: tagName
		}))
	},
];
