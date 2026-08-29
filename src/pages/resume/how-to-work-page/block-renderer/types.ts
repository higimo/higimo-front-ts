interface BaseBlock {
	type: string;
}

interface ContactListBlock extends BaseBlock {
	type: 'contactList';
}

interface HeadingBlock extends BaseBlock {
	type: 'heading';
	level: 1 | 2 | 3 | 4 | 5 | 6;
	text: string;
}
interface ParagraphBlock extends BaseBlock {
	type: 'paragraph';
	/** массив текстовых узлов, ссылок, strong и т.д. */
	children: InlineBlock[];
}
interface ListBlock extends BaseBlock {
	type: 'list';
	/** каждый пункт - строка (без вложенности) */
	items: string[];
}
interface CollapsibleBlock extends BaseBlock {
	type: 'collapsible';
	/** заголовок (только текст, без HTML) */
	header: string
	/** true если развёрнут по умолчанию (было fold={false}) */
	defaultOpen?: boolean
	/** внутри могут быть параграфы, списки */
	children: ContentBlock[]
}
interface InlineTextBlock extends BaseBlock {
	type: 'text';
	value: string;
}
interface InlineLinkBlock extends BaseBlock {
	type: 'link';
	href: string;
	text: string;
}
interface InlineStrongBlock extends BaseBlock {
	type: 'strong';
	value: string;
}
interface InlineStrongBlock extends BaseBlock {
	type: 'strong';
	value: string;
}

interface SlideBlock extends BaseBlock {
  type: 'slide';
  className?: string; // например, "slide" или "resume-hero"
  children: ContentBlock[]; // внутри слайда могут быть заголовки, параграфы и т.д.
}


// Блоки, которые могут быть на верхнем уровне страницы (в массиве blocks)
export type TopLevelBlock = SlideBlock | ContactListBlock;

// Блоки, которые могут быть внутри слайда или коллапса
export type ContentBlock = HeadingBlock | ParagraphBlock | ListBlock | CollapsibleBlock;

// Inline-блоки
export type InlineBlock = InlineTextBlock | InlineLinkBlock | InlineStrongBlock;

// Полный тип для любого блока (для универсального использования)
export type AnyBlock = TopLevelBlock | ContentBlock | InlineBlock;

export interface PageJSONData {
	blocks: TopLevelBlock[]; // только верхнеуровневые блоки (слайды, крошки, контакты)
}
