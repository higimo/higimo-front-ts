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
import { VkPhotoAlbumListEdit } from 'components/vk/vk-photo-album-edit'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { vkSession } from 'context/vk-signal'

import { as } from 'utils/types/as'
import { handleVkError } from 'utils/api/handle-errors/handle-vk-error'
import { toast } from 'toast'
import { vkApi } from 'repositories/vk-api.repository'

import { DEFAULT_ID } from 'config/DEFAULT-ID'

import '../vk-style.css'

// TODO: [FEATURE] реализовать сортировку альбома
export const VkAlbumEditPage: FunctionComponent = () => {
	const { status, data, error } = vkSession.value
	const { params: { albumId = DEFAULT_ID } } = useRoute()
	const [ photoList, setPhotoList ] = useState<VkPhotoType[]>([])

	const fetchPhotos = useCallback(async (ownerId: string, albumId: Positive) => {
		if (photoList.length) {
			return undefined
		}

		try {
			const loadedPhotos = await vkApi.getPhotos(ownerId, albumId)
			if (!loadedPhotos) {
				return undefined
			}

			setPhotoList(loadedPhotos)
		} catch (error) {
			handleVkError(error)
		}
	}, [photoList])

	useEffect(() => {
		if (status === 'LOADED') {
			fetchPhotos(data.user.id, as<Positive>(albumId))
		} else if (status === 'ERROR') {
			toast.error(error.message)
		}
	}, [status, error, data, fetchPhotos, albumId])

	return (
		<Layout title="Просмотр альбома" className="vk-identity-page vk-photo">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="vk">Редактирование описаний альбома</Heading>
				<VkParagraph>
					Всего фотографий: {photoList.length}
					<br />
					С комментариями: {photoList.filter(i => !!i.text).length}
				</VkParagraph>
			</TextContainer>

			<VkPhotoAlbumListEdit
				photoList={photoList}
			/>
		</Layout>
	)
}
