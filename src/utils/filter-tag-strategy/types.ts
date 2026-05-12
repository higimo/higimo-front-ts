import { Tag } from 'hook/tags/use-smart-tags'

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
