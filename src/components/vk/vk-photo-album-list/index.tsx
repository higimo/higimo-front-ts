import { VKAlbumType } from 'api-types/vk.types'
import { FunctionComponent } from 'preact'

import { VkAlbumElement } from 'components/vk/vk-album-element'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type VkPhotoAlbumListPropsType = {
	albums: VKAlbumType[]
}

export const VkPhotoAlbumList: FunctionComponent<VkPhotoAlbumListPropsType> = ({ albums }) => (
	<div className="album">
		<div className="album__list">
			{albums.map(album => (
				<VkAlbumElement key={album.id} {...album} />
			))}
		</div>
	</div>
)
