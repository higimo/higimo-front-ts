import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'api-types/vk.types'
import { VkApi, VkResponceError } from 'vendor/vk-api'

import { usePageTitle } from 'hook/browser/use-page-title'
import { useMessage } from 'hook/use-message'
import { useState, useCallback, useEffect } from 'preact/hooks'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container/index.js'
import { VkHeading } from 'components/vk/vk-heading'
import { VkParagraph } from 'components/vk/vk-paragraph'
import { VkPhotoAlbumList } from 'components/vk/vk-photo-tool-albums/index.js'
import { VkSdkLoader } from 'components/vk/vk-sdk-loader/index.js'

import { printVkError } from 'vendor/print-vk-error'

import { vkSession } from 'context/vk'

import '../vk-style.css'

export const VkAlbumListPage: FunctionComponent = () => {
	usePageTitle('Список альбомов')

	const { status, session, error } = vkSession.value
	const [ albums, setAlbums ] = useState<VKAlbumType[]>([])
	const { showMessage, MessageContainer } = useMessage()

	const fetchAlbums = useCallback(async (ownerId: string) => {
		try {
			const albums = await VkApi.getAlbums(ownerId)
			setAlbums(albums)
		} catch (error) {
			const vkError = error as VkResponceError
			showMessage(printVkError(vkError))
		}
	}, [showMessage])

	useEffect(() => {
		if (status === 'LOADED' && session?.user.id) {
			fetchAlbums(session.user.id)
		}
	}, [status, session, fetchAlbums])

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
				<VkHeading>Список альбомов</VkHeading>
				<VkParagraph>
					Альбомов: {albums.length} {' | '}
					Публичных: {albums.filter(i => !i.is_locked).length} {' | '}
					Фотографий всего: {albums.reduce((acc, i) => acc + i.size, 0)}
				</VkParagraph>
			</TextContainer>

			<TextContainer>
				<MessageContainer />
			</TextContainer>

			<VkPhotoAlbumList albums={albums} />
		</div>
	)
}
export default VkAlbumListPage
