import { Positive } from 'utils.type'
import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'api-types/vk.types'

import { useRoute } from 'preact-iso'
import { useState, useCallback, useEffect } from 'preact/hooks'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { Heading } from 'components/ui/heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkPhotoAlbumEdit } from 'components/vk/vk-photo-album-edit'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { vkSession } from 'context/vk-signal'

import { as } from 'utils/types/as'
import { toast } from 'toast'
import { VkApi } from 'repositories/vk-api.repository'

import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../vk-style.css'

// TODO: [FEATURE] реализовать сортировку альбома
export const VkAlbumEditPage: FunctionComponent = () => {
	const { status, session, error } = vkSession.value
	const { params: { albumId = DEFAULT_ID } } = useRoute()
	const [ photos, setPhotos ] = useState<VkPhotoType[]>([])

	const fetchPhotos = useCallback(async (ownerId: string, albumId: Positive) => {
		if (photos.length) {
			return undefined
		}

		const loadedPhotos = await VkApi.getPhotos(ownerId, albumId)
		if (!loadedPhotos) {
			return undefined
		}

		setPhotos(loadedPhotos)
	}, [photos])

	useEffect(() => {
		if (status === 'LOADED') {
			fetchPhotos(session.user.id, as<Positive>(albumId))
		} else if (status === 'ERROR') {
			toast.error(error.message)
		}
	}, [status, error, session, fetchPhotos, albumId])

	return (
		<Layout title="Просмотр альбома" className="vk-identity-page vk-photo">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="vk">Редактирование описаний альбома</Heading>
				<VkParagraph>
					Всего фотографий: {photos.length}
					<br />
					С комментариями: {photos.filter(i => !!i.text).length}
				</VkParagraph>
			</TextContainer>

			<VkPhotoAlbumEdit
				photos={photos}
			/>
		</Layout>
	)
}
