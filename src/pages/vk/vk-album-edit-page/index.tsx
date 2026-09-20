import { Positive } from 'utils.type'
import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useRoute } from 'preact-iso'
import { useState, useCallback, useEffect } from 'preact/hooks'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { VkHeading } from 'components/vk/vk-heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkPhotoAlbumEdit } from 'components/vk/vk-photo-album-edit'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { vkSession } from 'context/vk'

import { toast } from 'toast'
import { VkServiceApi } from 'pages/vk/vk-api-service'

import '../vk-style.css'

// TODO: [FEATURE] реализовать сортировку альбома
export const VkAlbumEditPage: FunctionComponent = () => {
	usePageTitle('Просмотр альбома')

	const { status, session, error } = vkSession.value
	const { params: { albumId = '' } } = useRoute()
	const [ photos, setPhotos ] = useState<VkPhotoType[]>([])

	const fetchPhotos = useCallback(async (ownerId: string, albumId: Positive) => {
		if (photos.length) {
			return undefined
		}

		const loadedPhotos = await VkServiceApi.getPhotos(ownerId, albumId)
		if (!loadedPhotos) {
			return undefined
		}

		setPhotos(loadedPhotos)
	}, [photos])

	useEffect(() => {
		if (status === 'LOADED') {
			fetchPhotos(session.user.id, albumId as unknown as Positive)
		} else if (status === 'ERROR') {
			toast.error(error.message)
		}
	}, [status, error, session, fetchPhotos, albumId])

	return (
		<div className="vk-identity-page vk-photo">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<VkHeading>Редактирование описаний альбома</VkHeading>
				<VkParagraph>
					Всего фотографий: {photos.length}
					<br />
					С комментариями: {photos.filter(i => !!i.text).length}
				</VkParagraph>
			</TextContainer>

			<VkPhotoAlbumEdit
				photos={photos}
			/>
		</div>
	)
}
