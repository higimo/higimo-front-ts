import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'
import { VkApi, VkResponceError } from 'vendor/vk-api'

import { useContext, useState, useLayoutEffect, useCallback, useEffect } from 'preact/hooks'
import { useMessage } from 'hook/use-message'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'

import { TextContainer } from 'components/ui/text-container'
import { VkHeading } from 'components/vk/vk-heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkPhotoToolAlbumEdit } from 'components/vk/vk-photo-tool-album-edit'

import { printVkError } from 'vendor/print-vk-error'

import { VkContext } from 'context/vk'

import '../vk-style.css'

export const VkAlbumEditPage: FunctionComponent = () => {
	usePageTitle('Просмотр альбома')

	const { isVkLogin, session, fetchLogin } = useContext(VkContext)
	const { params: { albumId = '' } } = useRoute()
	const [ photos, setPhotos ] = useState<VkPhotoType[]>([])
	const { showMessage, MessageContainer } = useMessage()

	useLayoutEffect(() => {
		fetchLogin()
	}, [fetchLogin])

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
		if (isVkLogin && session && session.user.id && albumId) {
			// @ts-ignore
			fetchPhotos(session.user.id, albumId)
		}
	}, [isVkLogin, session, albumId])

	return (
		<div className="vk-identity-page vk-photo">
			<TextContainer>
				<VkHeading level={1}>Сортировка фотографий альбома</VkHeading>
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
