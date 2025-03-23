import { FunctionComponent } from 'preact'
import { VkPhotoToolAlbumEdit } from '../../../components/vk/vk-photo-tool-album-edit/album.js';

import '../vk-style.css'

export const VkAlbumEditPage: FunctionComponent = () => {
	document.title = 'Просмотр альбома'

	return (
		<div className="vk-photo">
			<h1>Сортировка фотографий альбома</h1>
			<VkPhotoToolAlbumEdit />
		</div>
	)
}

export default VkAlbumEditPage
