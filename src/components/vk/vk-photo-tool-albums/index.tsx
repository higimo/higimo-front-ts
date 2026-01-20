import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'types'

import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'preact/hooks'
import { useMessage } from 'components/ui/message-container/useMessage'

import { VkContext } from 'context/vk'

import { VkAlbumElement } from 'components/vk/vk-album-element'
import { TextContainer } from 'components/ui/text-container'

import { VkApi } from 'utils/VkApi'
import { printVkError } from 'utils/print-vk-error'

export const VkPhotoAlbumList: FunctionComponent = () => {
	const { isVkLogin, session, fetchLogin } = useContext(VkContext)
	const [ albums, setAlbums ] = useState<VKAlbumType[]>([])
	const { showMessage, MessageContainer } = useMessage()

	useLayoutEffect(() => {
		fetchLogin();
	}, [fetchLogin]);

	const fetchAlbums = useCallback(async (ownerId) => {
		try {
			const albums = await VkApi.getAlbums(ownerId, ownerId)
			setAlbums(albums)
		} catch (vkError) {
			showMessage(printVkError(vkError))
		}
	}, [showMessage])

	useEffect(() => {
		if (isVkLogin && session.user.id) {
			fetchAlbums(session.user.id)
		}
	}, [isVkLogin, session])

	return (
		<div className="album">
			<TextContainer>
				<MessageContainer />
			</TextContainer>
			<div className="album__list">
				{albums.map(album => (
					<VkAlbumElement key={album.id} {...album} />
				))}
			</div>
		</div>
	)
}