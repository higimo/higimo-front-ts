import { FunctionComponent } from 'preact'
import { VkPhotoType } from '../../../types'
import { VkSessionType } from '../../../pages/vk/types'

import { useContext, useEffect, useState } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { VkContext } from '../../../context/vk'

type GetPhotosFromVkPropsType = {
	albumId: string;
	offset?: number;
	session: VkSessionType;
	cb: (items: VkPhotoType[]) => void;
}
const getPhotosFromVk = (props: GetPhotosFromVkPropsType) => {
	VK.Api.call('photos.get', {
		owner_id: props.session.user.id,
		album_id: props.albumId,
		rev: 0,
		photo_sizes: 1,
		offset: (props.offset || 0),
		count: 250,
		v:  5.199,
	}, response => {
		if (response.response) {
			props.cb(response.response.items)
		} else {
			// TODO FORM show Message
			console.error(response)
		}
	})
}

export const VkPhotoToolAlbumEdit: FunctionComponent = () => {
	const { isVkLogin, session } = useContext(VkContext)
	const { params: { albumId = '' } } = useRoute()
	const [ photos, setPhotos ] = useState<VkPhotoType[]>([])
	useEffect(() => {
		if (isVkLogin) {
			getPhotosFromVk({
				albumId: albumId,
				offset: 0,
				session: session,
				cb: (items) => setPhotos(items)
			})
		}
	}, [isVkLogin, session])

	return (
		<div className="album-sort-page">
			<div>
				{photos.map(photo => (
					<div>
						<img src={photo.sizes.find(item => item.type === 'r').url} />
						<br />
						<textarea>{photo.text}</textarea>
					</div>
				))}
			</div>
		</div>
	)
}
