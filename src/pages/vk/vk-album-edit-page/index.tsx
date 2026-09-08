import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'
import { VkApi, VkResponceError } from 'vendor/vk-api'

import { useContext, useState, useLayoutEffect, useCallback, useEffect } from 'preact/hooks'
import { useMessage } from 'hook/use-message'
import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'

import { VkPhotoToolAlbumEdit } from 'components/vk/vk-photo-tool-album-edit'
import { TextContainer } from 'components/ui/text-container'

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

	const fetchPhotos = useCallback(async (ownerId: string, albumId: string) => {
		try {
			const photos = await VkApi.getPhotos(ownerId, albumId)
			setPhotos(photos)
		} catch (error) {
			const vkError = error as VkResponceError
			showMessage(printVkError(vkError))
		}
	}, [showMessage])

	useEffect(() => {
		if (isVkLogin && session && session.user.id && albumId) {
			fetchPhotos(session.user.id, albumId)
		}
	}, [isVkLogin, session, albumId])

	return (
		<div className="vk-photo">
			<TextContainer>
				<h1>Сортировка фотографий альбома</h1>
			</TextContainer>
			<TextContainer>
				<MessageContainer />
			</TextContainer>
			<VkPhotoToolAlbumEdit photos={photos} />
		</div>
	)
}

export default VkAlbumEditPage
