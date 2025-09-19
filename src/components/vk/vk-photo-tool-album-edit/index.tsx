import { FunctionComponent } from 'preact'
import { VkPhotoType } from 'types'

import { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { useMessage } from 'components/ui/message-container/useMessage'
import { TextContainer } from 'components/ui/text-container'
import { VkApi } from 'utils/VkApi'
import { printVkError } from 'utils/print-vk-error'
import { VkContext } from 'context/vk'

export const VkPhotoToolAlbumEdit: FunctionComponent = () => {
	const { isVkLogin, session, fetchLogin } = useContext(VkContext)
	const { params: { albumId = '' } } = useRoute()
	const [ photos, setPhotos ] = useState<VkPhotoType[]>([])
	const { showMessage, MessageContainer } = useMessage()

	useLayoutEffect(() => {
		fetchLogin()
	}, [fetchLogin])

	const fetchPhotos = useCallback(async (ownerId, albumId) => {
		try {
			const photos = await VkApi.getPhotos(ownerId, albumId)
			setPhotos(photos)
		} catch (vkError) {
			showMessage(printVkError(vkError))
		}
	}, [showMessage])

	useEffect(() => {
		if (isVkLogin && session.user.id && albumId) {
			fetchPhotos(session.user.id, albumId)
		}
	}, [isVkLogin, session, albumId])
	
	return (
		<div className="album-sort-page">
			<TextContainer>
				<MessageContainer />
			</TextContainer>
			<div>
				{photos.map(photo => (
					<div key={photo.id}>
						{console.log(photo.sizes)}
						<img src={photo.sizes.find(item => item.type === 'r' || item.type === 'x').url} />
						<br />
						<textarea>{photo.text}</textarea>
					</div>
				))}
			</div>
		</div>
	)
}
