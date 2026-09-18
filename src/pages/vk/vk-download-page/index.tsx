import { FunctionComponent, TargetedEvent } from 'preact'
import { VkPhotosContentType, VkQueueType } from 'components/vk/types'

import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { useMessage } from 'hook/use-message'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useQueue } from 'hook/use-queue'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { VkDownloadForm } from 'components/vk/vk-download-form'
import { VkHeading } from 'components/vk/vk-heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { vkSession } from 'context/vk'

import { ALBUM_MAX_COUNT, QUEUE_TIMER, VkDownloadService } from 'components/vk/service/vk-download-service'

import '../vk-style.css'
import './style.css'

type ChangeEvent = TargetedEvent<HTMLInputElement, InputEvent>

export const VkDownloadPage: FunctionComponent = () => {
	usePageTitle('Скачать свои альбомы')

	const { status, session } = vkSession.value
	const { size, push, pull, view } = useQueue<VkQueueType>()
	const [ photos, setPhotos ] = useState<VkPhotosContentType[]>([])
	const [ downloadId, setDownloadId ] = useState<string>('')
	const { showMessage, MessageContainer } = useMessage()

	const showMessageRef = useRef(showMessage)
	showMessageRef.current = showMessage

	const serviceRef = useRef<VkDownloadService | null>(null)
	if (!serviceRef.current) {
		// TODO: [MIDDLE] перевести на тосты
		serviceRef.current = new VkDownloadService((message) => showMessageRef.current(message))
	}
	const service = serviceRef.current

	// TODO: [MIDDLE] вынести в ControllerForm или хук
	const handleGroupId = useCallback((event: ChangeEvent) => {
		if (!event.target) return
		setDownloadId('-' + event.currentTarget.value)
		setPhotos([])
	}, [])

	const handleUserId = useCallback((event: ChangeEvent) => {
		setDownloadId(event.currentTarget.value)
		setPhotos([])
	}, [])

	const handleSelf = useCallback(() => {
		if (!session) return
		setDownloadId(session.user.id)
		setPhotos([])
	}, [session])

	useEffect(() => {
		if (status === 'LOADED' && session?.user.id) {
			(async () => {
				const albums = await service.getAlbums(session.user.id)
				if (!albums) return
				albums.slice(0, ALBUM_MAX_COUNT).forEach(album => {
					push({
						type: 'album',
						id: album.id,
						title: album.title,
					})
				})
			})()
		}
	}, [status, session, downloadId, service, push])

	useEffect(() => {
		if (!size) return
		const headQueue = view()
		if (headQueue && headQueue.type === 'album') {
			showMessage(`Осталось скачать ${size} альбома`)
			;(async () => {
				const albumPhotos = await service.getPhotos(downloadId, headQueue.id)
				if (!albumPhotos) return
				setPhotos(prev => [
					...prev,
					{
						title: headQueue.title,
						photos: albumPhotos.map(item => item.orig_photo.url),
					},
				])
			})()
		}
		setTimeout(() => pull(), QUEUE_TIMER)
	}, [downloadId, size, view, pull, service, showMessage])

	return (
		<div className="vk-identity-page download-page">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<VkHeading>Скачать свои альбомы</VkHeading>
				<VkParagraph>
					Введите ид альбома, скопируйте результат и бахните его в wget
				</VkParagraph>
				<VkParagraph>
					Загрузит фотки из первых попавшихся {ALBUM_MAX_COUNT} твоих альбомов. Таймаут загрузки {QUEUE_TIMER / 1000}, чтобы не дудосить серваки ВК.
				</VkParagraph>
			</TextContainer>

			<VkDownloadForm
				onGroupId={handleGroupId}
				onUserId={handleUserId}
				onSelf={handleSelf}
			/>

			<TextContainer>
				<MessageContainer />
			</TextContainer>

			<TextContainer>
				<VkHeading level={2}>Результат</VkHeading>
			</TextContainer>

			<textarea className="download-page__pre">
				{JSON.stringify(photos, null, '\t')}
			</textarea>
		</div>
	)
}
