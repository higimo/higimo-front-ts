import { VkDownloadFormValuesType } from 'components/vk/vk-download-form/types'
import { VkQueueType, VkPhotosContentType } from 'api-types/vk.types'

import { useQueue } from 'hook/use-queue'
import { useState, useEffect, useCallback } from 'preact/hooks'

import { handleVkError } from 'utils/api/handle-errors/handle-vk-error'
import { toast } from 'toast'
import { vkApi } from 'repositories/vk-api.repository'

import { vkSession } from 'context/vk-signal'

import { ALBUM_MAX_COUNT, QUEUE_TIMER } from 'config/VK-CONST'

export type UseVkDownloadType = () => {
	onSubmit: (data: VkDownloadFormValuesType) => undefined
	photos: VkPhotosContentType[]
}

export const useVkDownload: UseVkDownloadType = () => {
	const { status, data } = vkSession.value

	const { size, push, pull, view } = useQueue<VkQueueType>()
	const [ photos, setPhotos ] = useState<VkPhotosContentType[]>([])
	const [ downloadId, setDownloadId ] = useState<string>('')

	// добавляем альбомы в обработчик
	useEffect(() => {
		if (status !== 'LOADED') {
			return undefined
		}
		(async () => {
			if (!downloadId) {
				return undefined
			}
			try {
				const albums = await vkApi.getAlbums(downloadId)
				if (!albums) {
					return undefined
				}
				albums.slice(0, ALBUM_MAX_COUNT).forEach(album => {
					push({
						type: 'album',
						id: album.id,
						title: album.title,
					})
				})
			} catch (error) {
				handleVkError(error)
			}
		})()
	}, [status, data, downloadId, push])

	// получаем из альбомов уже фотки
	useEffect(() => {
		if (!size) {
			return
		}

		const headQueue = view()
		if (headQueue && headQueue.type === 'album') {
			toast.info(`Осталось скачать ${size} альбома`);

			(async () => {
				try {
					const albumPhotos = await vkApi.getPhotos(downloadId, headQueue.id)
					setPhotos(prev => [
						...prev,
						{
							title: headQueue.title,
							photos: albumPhotos?.map(item => item.orig_photo.url),
						},
					])
				} catch (error) {
					handleVkError(error)
				}
			})()
		}
		setTimeout(() => pull(), QUEUE_TIMER)
	}, [downloadId, size, view, pull])

	const onSubmit = useCallback((values: VkDownloadFormValuesType) => {
		if (status !== 'LOADED') {
			return undefined
		}
		setPhotos([])
		if (values.groupId !== '') {
			setDownloadId('-' + values.groupId)
		} else if (values.userId !== '') {
			setDownloadId(values.userId)
		} else {
			setDownloadId(data.user.id)
		}
	}, [setPhotos, setDownloadId, data])

	return {
		onSubmit,
		photos,
	}
}
