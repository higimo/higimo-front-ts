import { VKAlbumType, VkPhotoType } from 'api-types/vk.types'
import { VkResponseData } from 'vendor/types'

import { toast } from 'toast'
import { vkApiCall } from 'utils/api/vk-api-call'

import { VkError } from 'errors/vk-error'
import { handleVkError } from 'utils/api/handle-errors/handle-vk-error'

class VkApiRepository {
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
				throw new VkError(
					{
						error_code: -1,
						error_msg: 'Альбомы не загрузились',
						request_params: {},
					},
					{ method: 'photos.getAlbums', params: { owner_id: userId } }
				)
			}

			return albums
		} catch (error) {
			// TODO: [LAST] нврн, это в catch надо унести
			if (!handleVkError(error)) {
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

			const albums = response.response.items
			if (!albums) {
				throw new VkError(
					{
						error_code: -1,
						error_msg: 'Альбомы не загрузились',
						request_params: {},
					},
					{ method: 'photos.getAlbums', params: { owner_id: userId } }
				)
			}

			return albums
		} catch (error) {
			// TODO: [LAST] нврн, это в catch надо унести
			if (!handleVkError(error)) {
				console.error(error)
			}
			return null
		}
	}

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

			const result = response.response
			if (!result) {
				throw new VkError(
					{
						error_code: -1,
						error_msg: 'Альбомы не загрузились',
						request_params: {},
					},
					{ method: 'photos.getAlbums', params: { owner_id: userId } }
				)
			}

			return result
		} catch (error) {
			// TODO: [LAST] нврн, это в catch надо унести
			if (!handleVkError(error)) {
				console.error(error)
			}
			return false
		}
	}
}

export const VkApi = new VkApiRepository()
