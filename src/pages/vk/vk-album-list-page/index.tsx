import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'api-types/vk.types'
import { VkApi, VkResponceError } from 'utils/VkApi'

import { usePageTitle } from 'hook/use-page-title'
import { useMessage } from 'components/ui/message-container/useMessage'
import { useContext, useState, useLayoutEffect, useCallback, useEffect } from 'preact/hooks'

import { VkPhotoAlbumList } from 'components/vk/vk-photo-tool-albums/index.js'
import { TextContainer } from 'components/ui/text-container/index.js'

import { printVkError } from 'utils/print-vk-error'

import { VkContext } from 'context/vk'

import '../vk-style.css'

export const VkAlbumListPage: FunctionComponent = () => {
	usePageTitle('Список альбомов')

	const { isVkLogin, session, fetchLogin } = useContext(VkContext)
	const [ albums, setAlbums ] = useState<VKAlbumType[]>([])
	const { showMessage, MessageContainer } = useMessage()

	useLayoutEffect(() => {
		fetchLogin()
	}, [fetchLogin])

	const fetchAlbums = useCallback(async (ownerId: string) => {
		try {
			const albums = await VkApi.getAlbums(ownerId, ownerId)
			setAlbums(albums)
		} catch (error) {
			const vkError = error as VkResponceError
			showMessage(printVkError(vkError))
		}
	}, [showMessage])

	useEffect(() => {
		if (isVkLogin && session && session.user.id) {
			fetchAlbums(session.user.id)
		}
	}, [isVkLogin, session])

	return (
		<div className="vk-photo">
			<TextContainer>
				<h1>Список альбомов</h1>
			</TextContainer>
			<TextContainer>
				<MessageContainer />
			</TextContainer>
			<VkPhotoAlbumList albums={albums} />
		</div>
	)
}
export default VkAlbumListPage
