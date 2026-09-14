import { UnixTime, UnixTimeSecond } from 'utils.type'

export type VKAlbumSizesType = {
	type: 'x' | 's'
	src: string
}

export type VKAlbumType = {
	/** Идентификатор альбома */
	id: number
	/** Идентификатор создателя */
	owner_id: number
	/** Видимость */
	is_locked: boolean
	/** Название */
	title: string
	/** Дата создания */
	created: UnixTimeSecond
	/** Дата обновления */
	updated: UnixTimeSecond
	/** Количество фотографий в альбоме */
	size: number
	/** Описание альбома */
	description: string
	/** Изображения обложки */
	sizes: VKAlbumSizesType[]
	/** Доступ к удалению */
	can_delete: boolean
}

export type VkPhotoOrigType = {
	height: number
	width: number
	type: 'base'
	url: string
}

export type VkPhotoSizesType = {
	height: number
	width: number
	type: 'm' | 'o' | 'p' | 'q' | 'r' | 's' | 'w' | 'x' | 'y' | 'z'
	url: string
}

export type VkPhotoType = {
	album_id: number
	date: UnixTime // timestamp
	id: number
	owner_id: number // user_id
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
	created: number // timestamp
	description: string
	can_delete: boolean
	can_include_to_feed: boolean
	is_locked: boolean
	privacy_comment: {
		category: 'all'
		lists: {
			allowed: []
			excluded: []
		}
		owners: {
			allowed: []
			excluded: []
		}
	}
	privacy_view: {
		category: string // 'only_me',
		lists: {
			allowed: []
			excluded: []
		}
		owners: {
			allowed: []
			excluded: []
		}
	}
	sizes: VkPhotoSizesType[]
	thumb_id: number
	thumb_is_last: number // bool? вижу 1
	updated: number // timestamp
}

export type VkSessionType = {
	mid: string // userId,
	sid: string // vk-sid
	sig: string // key
	secret: 'oauth'
	expire: number // date timestamp
	user: {
		id: string // userId
		domain: string // userLogin
		href: string // http url
		first_name: string
		last_name: string
		nickname: string // там пусто почему-то, отчество?
	}
}
