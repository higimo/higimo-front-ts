/**
 * Тип элемента данных, который содержит теги.
 */
interface DataItemWithTags {
	tags: string[];
	[key: string]: unknown;
}

/**
 * Тип для выбранных тегов по группам.
 */
type SelectedTags = Record<string, Set<string>>;
