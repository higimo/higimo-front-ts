import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'
import { VkApi, VkResponceError } from 'vendor/vk-api'

import { useMessage } from 'hook/use-message'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import { useState, useCallback, useEffect } from 'preact/hooks'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { VkHeading } from 'components/vk/vk-heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkPhotoToolAlbumEdit } from 'components/vk/vk-photo-tool-album-edit'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { printVkError } from 'vendor/print-vk-error'

import { vkSession } from 'context/vk'

import '../vk-style.css'

export const VkAlbumEditPage: FunctionComponent = () => {
	usePageTitle('Просмотр альбома')

	const { status, session, error } = vkSession.value
	const { params: { albumId = '' } } = useRoute()
	const [ photos, setPhotos ] = useState<VkPhotoType[]>([])
	const { showMessage, MessageContainer } = useMessage()

	const fetchPhotos = useCallback(async (ownerId: string, albumId: number) => {
		// TODO: try бы вынести в сервис VkApi
		try {
			const photos = await VkApi.getPhotos(ownerId, albumId)
			setPhotos(photos)
		} catch (error) {
			const vkError = error as VkResponceError
			// TODO: в таких местах бы сменить на тост?
			showMessage(printVkError(vkError))
		}
	}, [showMessage])

	useEffect(() => {
		if (status === 'LOADED' && session?.user.id) {
			fetchPhotos(session.user.id, albumId as unknown as number)
		}
	}, [status, session, fetchPhotos, albumId])

	useEffect(() => {
		if (status === 'ERROR' && error) {
			showMessage(error.message)
		}
	}, [status, error, showMessage])

	return (
		<div className="vk-identity-page vk-photo">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<VkHeading>Сортировка фотографий альбома</VkHeading>
				<VkParagraph>
					Всего фотографий: {photos.length}
					<br />
					С комментариями: {photos.filter(i => !!i.text).length}
				</VkParagraph>
			</TextContainer>

			<TextContainer>
				<MessageContainer />
			</TextContainer>

			<VkPhotoToolAlbumEdit
				photos={photos}
			/>
		</div>
	)
}

export default VkAlbumEditPage
