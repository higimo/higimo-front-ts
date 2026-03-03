export type HigimoServerResponse = any[]

export type AccordType = {
	id: number
	name: string
	code: string
	text: string
	view: number
}

export type AccordModeType = AccordType & {
	isNew: boolean
	isMostView: boolean
}

export type CinemaType = {
	id: number
	title: string
	code: string
	text: string
}

export type DemagogType = {
	id: number
	name: string
	description: string
}

export type FaqType = {
	id: number
	name: string
	code: string
	text: string
}

export type FeedbackPageType = {
	id: number,
	title: string
	sort: number
	code: string | null
	created_at: string // datetime
}

type FeedbackBlockType = {
	id: number
	page: number
	sort: number
	created_at: string // datetime
	theme: string | null
	name: string
	text: string | null
	image: string | null
	file: string | null
}

type FeedBackNavigation = {
	id: number
	title: string
	code: string | null,
	sort: number
}

export type FeedbackElement = {
	id: number
	title: string
	sort: number
	code: string | null
	created_at: string // datetime
	blocks: FeedbackBlockType[]
	navigation: {
		prev: FeedBackNavigation | null,
		next: FeedBackNavigation | null
	}
}

export type YaMapType = {
	id: string
	name: string
	code: string
	map: string
}

export type LinksType = {
	id: number
	url: string
	description: string
}

export type ListPropertyType = {
	id: number
	item_id: number
	property_id: number
	value: string
	property: {
		id: number
		item_id: number
		name: string
		type: string
	}
}

export type ListerItem = {
	id: number
	parent_id: number
	title: string
	code: string
	created_at: number
	children?: ListerItem[];
	parent?: ListerItem;
	values?: ListPropertyType[];
}

export type ListerProperty = {
	id: number
	name: string
	type: string
	item: number
}

export type ListerValue = {
	id: number
	value: string
	property: number
	item: number
}

export type ListListType = ListerItem & {
	child?: ListerItem[]
}

/**
 * =========================================
 * Нокиа
 * =========================================
 */

export type NokiaTagGroupType = string

export type NokiaTagType = {
	id: number
	name: string
	group: NokiaTagGroupType
}
export type NokiaPersonApiType = {
	id: number
	name: string
	alias: string
	nick: string
	description: string
}
export type NokiaPersonType = NokiaPersonApiType & {
	tags: NokiaTagType[]
}
export type NokiaMeetingApiType = {
	id: number,
	/** 'meeting' 'tg' 'offline' */
	type: string
	/** unixtime / 1000 */
	date: number // TODO: заменить на бэке на date
	/** "2024-01-15T10:00:00Z" */
	date_start: string
	/** "2024-01-15T10:00:00Z" */
	date_end: string
	description: string
}
export type NokiaRichMeetingType = NokiaMeetingApiType & {
	person: NokiaPersonType[]
}
export type NokiaNoteType = {
    id: number
    text: string
    person_id: number
}
// TODO: надо исправить см. NokiaMeetingApiType
export type NokiaMeetingWithPersonType = NokiaMeetingApiType & {
    person: NokiaPersonApiType[]
}
// TODO: надо исправить
export type NokiaPersonFullType = {
	id: number
	name: string
	alias: string
	nick: string
	description: string
	tags: NokiaTagType[]
    notes: NokiaNoteType[]
    meetings: NokiaMeetingWithPersonType[]
}
export type NokiaMeetingStatisticType = {
    id: number
    date: number
    type: string
}

/**
 * ===================================
 *             Пинарик
 * ===================================
 */

export type PinarikType = {
	id: number,
	date: string // 2020-05-14
	score: number,
	description: string
}


/**
 * ===================================
 *             Лекции
 * ===================================
 */

export type LectionType = {
	id: number
	name: string
	code: string
	text: string
}


/**
 * ===================================
 *             Портфолио
 * ===================================
 */

export type PortfolioIdsType = {
	id: number
	vendor: number
	code: string
}
export type PortfolioTag = {
	id: number
	title: string
}
export type PortfolioWorkerType = {
	id: number,
	full_name: string
	login: string
	company: string
	image: null
	role: string
	link?: string
}
export type PortfolioCreditsType = {
	role: string
	worker: PortfolioWorkerType
}
export type PortfolioVendorType = {
	id: number
	code: string
	title: string
	description?: string
}
// TODO: бекенд Вот бы добавить следующий и предыдущий кейс

export type PortfolioProjectApiType = {
	id: number
	vendor_id: number
	vendor: PortfolioVendorType
	name: string
	code: string
	date: string // yyy-mm-dd
	image: 'png' | 'jpg'
	cover_size: 'high' | 'big' | 'normal' | 'small'
	isLink: boolean
	link?: string
}
// TODO: отделить тип для сингл страницы от остальных
export type PortfolioProjectType = PortfolioProjectApiType & {
	tags: PortfolioTag[]
	credits?: PortfolioCreditsType[]
	description?: string
	text?: string
}





export type PetProjectType = {
	name: string
	description: string
	priority: number
}

export type YoutubeType = {
	code: string
	name: string
}

export type VKAlbumSizesType = {
	type: 'x' | 's'
	src: string
}

export type VKAlbumType = {
	id: string
	privacy_view: {
		type: 'all' | 'private'
	}
	title: string
	size: string
	description: string
	sizes: VKAlbumSizesType[]
}

export type VkPhotoOrigType = {
	height: number,
	width: number
	type: 'base',
	url: string
}

export type VkPhotoSizesType = {
	height: number
	width: number
	type: 'm' | 'o' | 'p' | 'q' | 'r' | 's' | 'w' | 'x' | 'y' | 'z'
	url: string
}

export type VkPhotoType = {
	album_id: number,
	date: number, // timestamp
	id: number,
	owner_id: number, // user_id
	sizes: VkPhotoSizesType[]
	text: string
	web_view_token: string
	has_tags: boolean
	orig_photo: VkPhotoOrigType
}

export type VkAlbumType = {
	id: number // album id
	owner_id: number // userId
	size: number // count photos
	title: string // Название альбома
	feed_disabled: number // bool? вижу 0
	feed_has_pinned: number // bool? вижу 0
	created: number, // timestamp
	description: string,
	can_delete: boolean,
	can_include_to_feed: boolean,
	is_locked: boolean,
	privacy_comment: {
		category: 'all',
		lists: {
			allowed: [],
			excluded: []
		},
		owners: {
			allowed: [],
			excluded: []
		}
	},
	privacy_view: {
		category: string // 'only_me',
		lists: {
			allowed: [],
			excluded: []
		},
		owners: {
			allowed: [],
			excluded: []
		}
	},
	sizes: VkPhotoSizesType[]
	thumb_id: number,
	thumb_is_last: number, // bool? вижу 1
	updated: number // timestamp
}

export type ComojiType = {
	id: number
	comoji: string
}

export type TableGameType = {
	id: number
	name: string
	text: string
}
