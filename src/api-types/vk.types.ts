import { UnixTimeSecond } from 'utils.type'

export type VkUserId = string

export type VKAlbumSizesType = {
	type: 'x' | 's'
	src: string
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
	date: UnixTimeSecond
	id: number
	/** user_id */
	owner_id: VkUserId
	sizes: VkPhotoSizesType[]
	text: string
	web_view_token: string
	has_tags: boolean
	orig_photo: VkPhotoOrigType
}

export type VKAlbumType = {
	/** Идентификатор альбома */
	id: number
	/** Идентификатор создателя */
	owner_id: VkUserId
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

export type VkAlbumType = {
	/** идентификатор альбома */
	id: number
	/** идентификатор владельца альбома */
	owner_id: VkUserId
	/** идентификатор фотографии, которая является обложкой (0, если обложка отсутствует) */
	thumb_id: number
	/** ссылка на изображение обложки альбома (если был указан параметр need_covers) */
	thumb_src: string
	/** количество фотографий в альбоме */
	size: number
	/** название альбома */
	title: string
	feed_disabled: number
	feed_has_pinned: number
	/** дата создания альбома в формате unixtime (не приходит для системных альбомов) */
	created: UnixTimeSecond
	/** дата последнего обновления альбома в формате unixtime (не приходит для системных альбомов) */
	updated: UnixTimeSecond
	/** описание альбома (не приходит для системных альбомов) */
	description: string
	is_locked: boolean
	/** настройки приватности для альбома в формате настроек приватности (только для альбома пользователя, не приходит для системных альбомов) */
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
	/** настройки приватности для альбома в формате настроек приватности (только для альбома пользователя, не приходит для системных альбомов) */
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
	thumb_is_last: number // bool? вижу 1

}


export type VkSessionType = {
	/** userId */
	mid: VkUserId
	/** время в формате Unixtime, когда сессия устареет */
	expire: UnixTimeSecond

	// Служебное
	/** vk-sid */
	sid: string
	/** key */
	sig: string
	secret: 'oauth'

	user: {
		/** userId */
		id: VkUserId
		/** короткий адрес страницы */
		domain: string
		/** ссылка на страницу в формате https://vk.com/domain */
		href: string // http url
		/** имя */
		first_name: string
		/** фамилия */
		last_name: string
		/** отчество или никнейм (если указано) */
		nickname: string
	}
}
