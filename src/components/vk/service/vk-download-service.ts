import { VKAlbumType, VkPhotoType } from 'api-types/vk.types'

import { printVkError } from 'vendor/print-vk-error'
import { VkApi, VkResponceError } from 'vendor/vk-api'

export const ALBUM_MAX_COUNT = 3
export const QUEUE_TIMER = 1500

// TODO: VkApi
export class VkDownloadService {
	constructor(
		private showMessage: (message: string) => void,
	) {}

	async getAlbums(userId: string): Promise<VKAlbumType[] | null> {
		try {
			const albums = await VkApi.getAlbums(userId)
			this.showMessage(`Всего альбомов ${albums.length}, беру первые ${ALBUM_MAX_COUNT}`)
			return albums
		} catch (error) {
			this.showMessage(printVkError(error as VkResponceError))
			return null
		}
	}

	async getPhotos(downloadId: string, albumId: VKAlbumType['id']): Promise<VkPhotoType[] | null> {
		try {
			return await VkApi.getPhotos(downloadId, albumId)
		} catch (error) {
			this.showMessage(printVkError(error as VkResponceError))
			return null
		}
	}
}
