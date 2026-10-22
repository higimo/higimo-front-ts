import { VKAlbumType, VkPhotoType } from 'api-types/vk.types'
import { VkError } from 'errors/vk-error'
import { VkResponseData } from 'api-types/vk.types'

import { vkApiCall } from 'utils/api/vk-api-call'

class VkApiRepository {
	async getAlbums(
		userId: VKAlbumType['owner_id']
	): Promise<VKAlbumType[] | null> {
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
				{ method: 'photos.getAlbums', params: {} }
			)
		}

		return albums
	}

	async getPhotos(
		userId: VKAlbumType['owner_id'],
		albumId: VKAlbumType['id']
	): Promise<VkPhotoType[]> {
		const response = await vkApiCall<VkResponseData<{ items: VkPhotoType[] }>>('photos.get', {
			owner_id: userId,
			album_id: albumId,
			rev: 0,
			photo_sizes: 1,
			offset: 0,
			count: 600,
			v: '5.199',
		})
		const photos = response.response.items
		if (!photos) {
			throw new VkError(
				{
					error_code: -1,
					error_msg: 'Альбомы не загрузились',
					request_params: {},
				},
				{ method: 'photos.get', params: {} }
			)
		}
		return photos
	}

	/** Редактирует описание у фотографии */
	async editPhoto(
		userId: VkPhotoType['owner_id'],
		photoId: VkPhotoType['id'],
		description: VkPhotoType['text']
	): Promise<boolean> {
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
						error_msg: 'Описание не изменилось',
						request_params: {},
					},
					{ method: 'photos.edit', params: {} }
				)
			}

			return result
	}
}

export const vkApi = new VkApiRepository()
