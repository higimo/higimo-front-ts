import { VKAlbumType, VkPhotoType, VkUserId } from 'api-types/vk.types'

export type VkResponceError = {
	error: {
		error_code: number
		error_msg: string
		request_params: Record<string, unknown>
	}
}
type VkResponseData<T> = {
	response: T
}
type VkResponse<T> = VkResponseData<T> | VkResponceError
function vkApiCall<T>(method: string, params: Record<string, unknown>): Promise<T> {
	return new Promise((resolve, reject) => {
		VK.Api.call(method, params, (response: VkResponse<T>) => {
			if ('response' in response) {
				resolve(response as T)
			} else {
				reject(response)
			}
		})
	})
}
// TODO: VkDownloadService
export const VkApi = {
	async getAlbums(ownerId: VkUserId): Promise<VKAlbumType[]> {
		try {
			const response = await vkApiCall<VkResponseData<{ items: VKAlbumType[] }>>('photos.getAlbums', {
				owner_id: ownerId,
				need_covers: 1,
				photo_sizes: 1,
				v: 5.199,
			})
			return response.response.items
		} catch (response) {
			throw response
		}
	},

	async getPhotos(ownerId: VkUserId, albumId: VKAlbumType['id']): Promise<VkPhotoType[]> {
		try {
			const response = await vkApiCall<VkResponseData<{ items: VkPhotoType[] }>>('photos.get', {
				owner_id: ownerId,
				album_id: albumId,
				rev: 0,
				photo_sizes: 1,
				offset: 0,
				count: 600,
				v: '5.199',
			})
			return response.response.items
		} catch (response) {
			throw response
		}
	},
}
