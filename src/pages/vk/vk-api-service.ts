import { VKAlbumType, VkPhotoType } from 'api-types/vk.types'
import { VkResponseData } from 'vendor/types'

import { toast } from 'toast'
import { vkApiCall } from 'vendor/vk-api-call'

import { VKError } from 'errors/vk-error'

class VkApiService {
	constructor() {
	}

	async getAlbums(
		userId: VKAlbumType['owner_id']
	): Promise<VKAlbumType[] | null> {
		try {
			const response = await vkApiCall<VkResponseData<{ items: VKAlbumType[] }>>('photos.getAlbums', {
				owner_id: userId,
				need_covers: 1,
				photo_sizes: 1,
				v: 5.199,
			})

			const albums = response.response.items
			if (!albums) {
				throw new Error('Альбомы не загрузились')
			}

			return albums
		} catch (error) {
			if (error instanceof VKError) {
				toast.warning(error.error_msg)
			} else {
				console.error(error)
			}
			return null
		}
	}

	async getPhotos(
		userId: VKAlbumType['owner_id'],
		albumId: VKAlbumType['id']
	): Promise<VkPhotoType[] | null> {
		try {
			const response = await vkApiCall<VkResponseData<{ items: VkPhotoType[] }>>('photos.get', {
				owner_id: userId,
				album_id: albumId,
				rev: 0,
				photo_sizes: 1,
				offset: 0,
				count: 600,
				v: '5.199',
			})
			return response.response.items
		} catch (error) {
			if (error instanceof VKError) {
				toast.warning(error.error_msg)
			} else {
				console.error(error)
			}
			return null
		}
	}

	// TODO: [LIGHT] прикольно добавить тип Positive для photoId
	/** Редактирует описание у фотографии */
	async editPhoto(
		userId: VkPhotoType['owner_id'],
		photoId: VkPhotoType['id'],
		description: VkPhotoType['text']
	): Promise<boolean> {
		try {
			const response = await vkApiCall<VkResponseData<boolean>>('photos.edit', {
				owner_id: userId,
				photo_id: photoId,
				caption: description,

				v: '5.199',
			})
			return response.response
		} catch (error) {
			if (error instanceof VKError) {
				toast.warning(error.error_msg)
			} else {
				console.error(error)
			}
			return false
		}
	}
}

export const VkServiceApi = new VkApiService()
