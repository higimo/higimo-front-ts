import { VKAlbumType } from 'api-types/vk.types'
import { FunctionComponent } from 'preact'

import { VkPhotoAlbumItem } from 'components/vk/vk-photo-album-item'

import './style.css'

type VkPhotoAlbumListPropsType = {
	albums: VKAlbumType[]
}

export const VkPhotoAlbumList: FunctionComponent<VkPhotoAlbumListPropsType> = ({ albums }) => (
	<div className="album">
		<div className="album__list">
			{albums.map(album => (
				<VkPhotoAlbumItem key={album.id} {...album} />
			))}
		</div>
	</div>
)
