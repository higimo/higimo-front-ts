import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'api-types/vk.types'

import { useState, useCallback, useEffect } from 'preact/hooks'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { Heading } from 'components/ui/heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkPhotoAlbumList } from 'components/vk/vk-photo-album-list'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { toast } from 'toast'
import { vkApi } from 'repositories/vk-api.repository'
import { vkSession } from 'context/vk-signal'

import '../vk-style.css'

export const VkAlbumListPage: FunctionComponent = () => {
	const { status, data, error } = vkSession.value
	const [ albumList, setAlbumList ] = useState<VKAlbumType[]>([])

	const fetchAlbums = useCallback(async (ownerId: string) => {
		const albums = await vkApi.getAlbums(ownerId)
		if (!albums) {
			return undefined
		}

		setAlbumList(albums)
	}, [setAlbumList])

	useEffect(() => {
		if (status === 'LOADED') {
			fetchAlbums(data.user.id)
		} else if (status === 'ERROR') {
			toast.error(error.message)
		}
	}, [status, data, fetchAlbums])

	return (
		<Layout className="vk-identity-page vk-photo" title="Список альбомов">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="vk">Список альбомов</Heading>
				<VkParagraph>
					Альбомов: {albumList.length} {' | '}
					Публичных: {albumList.filter(i => !i.is_locked).length} {' | '}
					Фотографий всего: {albumList.reduce((acc, i) => acc + i.size, 0)}
				</VkParagraph>
			</TextContainer>

			<VkPhotoAlbumList
				albumList={albumList}
			/>
		</Layout>
	)
}
