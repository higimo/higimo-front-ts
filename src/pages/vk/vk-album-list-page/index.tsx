import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'api-types/vk.types'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useState, useCallback, useEffect } from 'preact/hooks'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { VkHeading } from 'components/vk/vk-heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkPhotoAlbumList } from 'components/vk/vk-photo-album-list'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader'

import { vkSession } from 'context/vk'

import { toast } from 'toast'
import { VkApi } from 'repositories/vk-api.repository'

import '../vk-style.css'

export const VkAlbumListPage: FunctionComponent = () => {
	usePageTitle('Список альбомов')

	const { status, session, error } = vkSession.value
	const [ albums, setAlbums ] = useState<VKAlbumType[]>([])

	const fetchAlbums = useCallback(async (ownerId: string) => {
		const albums = await VkApi.getAlbums(ownerId)
		if (!albums) {
			return undefined
		}

		setAlbums(albums)
	}, [setAlbums])

	useEffect(() => {
		if (status === 'LOADED') {
			fetchAlbums(session.user.id)
		} else if (status === 'ERROR') {
			toast.error(error.message)
		}
	}, [status, session, fetchAlbums])

	return (
		<div className="vk-identity-page vk-photo">
			<VkSdkLoader />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<VkHeading>Список альбомов</VkHeading>
				<VkParagraph>
					Альбомов: {albums.length} {' | '}
					Публичных: {albums.filter(i => !i.is_locked).length} {' | '}
					Фотографий всего: {albums.reduce((acc, i) => acc + i.size, 0)}
				</VkParagraph>
			</TextContainer>

			<VkPhotoAlbumList albums={albums} />
		</div>
	)
}
