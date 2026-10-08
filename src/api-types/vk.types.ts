import { Positive, UnixTimeSecond } from 'utils.type'

export type VkUserId = string

type VKAlbumSizesType = {
	type: 'x' | 's'
	src: string
}

type VkPhotoOrigType = {
	height: number
	width: number
	type: 'base'
	url: string
}

type VkPhotoSizesType = {
	height: number
	width: number
	type: 'm' | 'o' | 'p' | 'q' | 'r' | 's' | 'w' | 'x' | 'y' | 'z'
	url: string
}

export type VkPhotoType = {
	album_id: Positive
	date: UnixTimeSecond
	id: Positive
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
	id: Positive
	/** Идентификатор владельца альбома */
	owner_id: VkUserId
	/** Идентификатор фотографии-обложки (0, если обложка отсутствует) */
	thumb_id: number
	/** URL обложки альбома (если был указан параметр need_covers) */
	thumb_src: string
	/** Видимость */
	is_locked: boolean
	/** Название альбома */
	title: string
	/** Дата создания в формате unixtime (не приходит для системных альбомов) */
	created: UnixTimeSecond
	/** Дата обновления в формате unixtime (не приходит для системных альбомов) */
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
		href: string
		/** имя */
		first_name: string
		/** фамилия */
		last_name: string
		/** отчество или никнейм (если указано) */
		nickname: string
	}
}

export type VkQueueType = {
	type: 'album'
	id: VKAlbumType['id']
	title: VKAlbumType['title']
}

export type VkPhotosContentType = {
	title: VKAlbumType['title']
	photos: VkPhotoType['orig_photo']['url'][]
}

export type VkAuthResultType = {
	status: string
	session: VkSessionType | null
}

