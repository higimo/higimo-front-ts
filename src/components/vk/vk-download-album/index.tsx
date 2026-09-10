import { FunctionComponent, Fragment, JSX } from 'preact'
import { VKAlbumType, VkPhotoType } from 'api-types/vk.types'

import { useContext, useState, useLayoutEffect, useCallback, useEffect } from 'preact/hooks'
import { useQueue } from 'hook/use-queue'
import { useMessage } from 'hook/use-message'

import { TextContainer } from 'components/ui/text-container'

import { printVkError } from 'vendor/print-vk-error'

import { VkApi, VkResponceError } from 'vendor/vk-api'

import { VkContext } from 'context/vk'

import './style.css'

type ChangeEvent = JSX.TargetedEvent<HTMLInputElement, InputEvent>

	export const ALBUM_MAX_COUNT = 3
export const QUEUE_TIMER = 1500

type VkQueueType = {
	type: 'album'
	id: VKAlbumType['id']
	title: VKAlbumType['title']
}

type VkPhotosContentType = {
	title: VKAlbumType['title']
	photos: VkPhotoType['orig_photo']['url'][]
}

// TODO: [HARD] Не скачивает данные, обман!
// TODO: [HARD] Не работает от слова совсем
export const VkDownloadAlbum: FunctionComponent = () => {
	// TODO: [LIGHT] перенести в page
	const { isVkLogin, session, fetchLogin } = useContext(VkContext)
	const { size, push, pull, view } = useQueue<VkQueueType>()
	const [photos, setPhotos] = useState<VkPhotosContentType[]>([])
	const { showMessage, MessageContainer } = useMessage()

	useLayoutEffect(fetchLogin, [fetchLogin])

	const getPhotos = useCallback(async (downloadId: string, albumId: VKAlbumType['id'], title: string) => {
		if (isVkLogin) {
			try {
				const photos = await VkApi.getPhotos(downloadId, albumId)
				setPhotos(preState => [
					...preState,
					{
						title: title,
						photos: photos.map(item => item.orig_photo.url),
					},
				])
			} catch (error) {
				const vkError = error as VkResponceError
				showMessage(printVkError(vkError))
			}
		}
	}, [isVkLogin, setPhotos, showMessage])

	const getAlbums = useCallback(async (downloadId: string) => {
		if (isVkLogin && session) {
			try {
				const albums = await VkApi.getAlbums(session.user.id, downloadId)

				showMessage(`Всего альбомов ${albums.length}, беру первые ${ALBUM_MAX_COUNT}`)
				albums.slice(0, ALBUM_MAX_COUNT).map(album => {
					push({
						type: 'album',
						id: album.id,
						title: album.title,
					})
				})
			} catch (error) {
				const vkError = error as VkResponceError
				showMessage(printVkError(vkError))
			}
		}
	}, [isVkLogin, session, push, showMessage])

	const [downloadId, setDownloadId] = useState<string>('')
	const handleChangeDownloadId = useCallback((value: string) => {
		setDownloadId(value)
		setPhotos([])
	}, [setDownloadId, setPhotos])
	const handleGroupId = useCallback((event: ChangeEvent) => event.target && handleChangeDownloadId('-' + event.currentTarget.value), [handleChangeDownloadId])
	const handleUserId = useCallback((event: ChangeEvent) => handleChangeDownloadId(event.currentTarget.value), [handleChangeDownloadId])
	const handleSelf = useCallback(() => session && handleChangeDownloadId(session.user.id), [handleChangeDownloadId, session])

	useEffect(() => {
		if (isVkLogin && downloadId.length > 0) {
			getAlbums(downloadId)
		}
	}, [isVkLogin, downloadId])

	useEffect(() => {
		if (size) {
			const headQueue = view()
			if (headQueue && headQueue.type === 'album') {
				showMessage(`Осталось скачать ${size} альбома`)
				getPhotos(downloadId, headQueue.id, headQueue.title)
			}

			setTimeout(() => pull(), QUEUE_TIMER)
		}
	}, [downloadId, size, view, pull])

	return (
		<Fragment>
			<TextContainer>
				<p>
					Введите ид альбома, скопируйте результат и бахните его в wget
				</p>
				<p>
					Загрузит фотки из первых попавшихся {ALBUM_MAX_COUNT} твоих альбомов. Таймаут загрузки {QUEUE_TIMER / 1000}, чтобы не дудосить серваки ВК.
				</p>
			</TextContainer>
			<TextContainer className="download-page__input">
				<div>
					<div>Ид группы</div>
					<input placeholder="120" onChange={handleGroupId} />
				</div>
				<div>
					<div>Ид пользователя</div>
					<input placeholder="510" onChange={handleUserId} />
				</div>
				<div>
					Тут всё автоматически
					<button onClick={handleSelf}>Скачать свои</button>
				</div>
			</TextContainer>
			<TextContainer>
				<MessageContainer />
			</TextContainer>
			<TextContainer>
				<h2>Результат</h2>
			</TextContainer>
			<textarea className="download-page__pre">
				{JSON.stringify(photos, null, '\t')}
			</textarea>
		</Fragment>
	)
}
