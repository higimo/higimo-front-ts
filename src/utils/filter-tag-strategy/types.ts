/**
 * Тип элемента данных, который содержит теги.
 */
export interface DataItemWithTags {
	tags: string[];
	[key: string]: unknown;
}

/**
 * Тип для выбранных тегов по группам.
 */
export type SelectedTags = Record<string, Set<string>>;
