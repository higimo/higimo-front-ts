import { FactoidType } from 'components/ui/factoid'

export interface BaseBlock {
	type: string
}


/**
 * *******************
 * Блоки
 * *******************
 */
interface ContactListBlock extends BaseBlock {
	type: 'contactList'
}
interface HeadingBlock extends BaseBlock {
	type: 'heading'
	level: 1 | 2 | 3 | 4 | 5 | 6
	text: string
}
interface ParagraphBlock extends BaseBlock {
	type: 'paragraph'
	/** массив текстовых узлов, ссылок, strong и т.д. */
	children: InlineBlock[]
}
export interface ListBlock extends BaseBlock {
	type: 'list'
	/** `true` — `ol`, `false` — `ul` */
	ordered: boolean
	items: string[] | ListItemBlock[]
}
interface CollapsibleBlock extends BaseBlock {
	type: 'collapsible'
	/** заголовок (только текст, без HTML) */
	header: string
	/** true если развёрнут по умолчанию (было fold={false}) */
	defaultOpen?: boolean
	/** внутри могут быть параграфы, списки */
	children: ContentBlock[]
}
interface SlideBlock extends BaseBlock {
	type: 'slide'
	/** slide или resume-hero */
	className?: string
	/** внутри слайда могут быть заголовки, параграфы и т.д. */
	children: ContentBlock[]
}
/** Основной контентный блок для текста */
export interface TextContainerBlock extends BaseBlock {
	type: 'textContainer'
	children: ContentBlock[]
}
export interface ListItemBlock {
	text: string
	children?: ListBlock[]
}


/**
 * *******************
 * Инлайн элементы
 * *******************
 */
interface TextInlineBlock extends BaseBlock {
	type: 'text'
	value: string
}
interface LinkInlineBlock extends BaseBlock {
	type: 'link'
	href: string
	text: string
}
export interface StrongInlineBlock extends BaseBlock {
	type: 'strong'
	value: string
	className?: string
}
export interface SpanInlineBlock extends BaseBlock {
	type: 'span'
	className?: string
	value: string
}


/**
 * *******************
 * Блоки резюме
 * *******************
 */
/** Текстовый блок с контактными данными */
export interface ContactInfoBlock extends BaseBlock {
	type: 'contactInfo'
	phone: string
	telegram: string
	email: string
	website: string
	location: string
}
export interface ExperienceListBlock extends BaseBlock {
	type: 'experienceList'
	items: ExperienceItemBlock[]
}
export interface ExperienceItemBlock {
	profession: string
	company: string
	companyUrl?: string
	period: string
	duration?: string
	description?: ContentBlock[]
}
export interface SkillsBlock extends BaseBlock {
	type: 'skills'
	title: string
	items: string[]
}
export interface AboutBlock extends BaseBlock {
	type: 'about'
	title: string
	paragraphs: ParagraphBlock[]
}
export interface EducationBlock extends BaseBlock {
	type: 'education'
	status: string
	date: string
	speciality: string
	institution: string
}


/**
 * *******************
 * Блоки путешествий
 * *******************
 */
export interface TripEvent {
	type: 'roadmap' | 'teleport' | 'night'
	left?: string
	text: string
	modifier?: 'maybe'
}
export interface TripDay {
	type: 'trip-day'
	title: string
	events: TripEvent[]
}
export interface TripSummary {
	type: 'trip-summary'
	counters: FactoidType[]
}



export type ContentBlock =
	| HeadingBlock
	| ParagraphBlock
	| ListBlock
	| CollapsibleBlock
	| ContactInfoBlock
	| ExperienceListBlock
	| SkillsBlock
	| AboutBlock
	| EducationBlock

export type InlineBlock =
	| TextInlineBlock
	| LinkInlineBlock
	| StrongInlineBlock
	| SpanInlineBlock

export type TripBlock = TripDay | TripSummary

// Блоки, которые могут быть на верхнем уровне страницы (в массиве blocks)
export type TopLevelBlock = SlideBlock | ContactListBlock | TextContainerBlock | TripBlock

export type AnyBlock = TopLevelBlock | ContentBlock | InlineBlock

export interface PageJSONData {
	blocks: TopLevelBlock[]
}
