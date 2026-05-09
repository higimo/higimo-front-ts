import { FunctionComponent } from 'preact'
import { VKAlbumType } from 'api-types/vk.types'

import { VkAlbumElement } from 'components/vk/vk-album-element'

type VkPhotoAlbumListPropsType = {
	albums: VKAlbumType[]
}
export const VkPhotoAlbumList: FunctionComponent<VkPhotoAlbumListPropsType> = ({ albums }) => {
	return (
		<div className="album">
			<div className="album__list">
				{albums.map(album => (
					<VkAlbumElement key={album.id} {...album} />
				))}
			</div>
		</div>
	)
}
