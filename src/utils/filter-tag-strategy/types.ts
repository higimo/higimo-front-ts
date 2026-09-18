import { Tag } from 'hook/tags/use-smart-tags'

// TODO: [LIGHT] перенести в общее место

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
