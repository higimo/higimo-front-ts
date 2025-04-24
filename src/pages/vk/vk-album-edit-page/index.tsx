import { FunctionComponent } from 'preact'
import { VkPhotoToolAlbumEdit } from '../../../components/vk/vk-photo-tool-album-edit';

import '../vk-style.css'
import { TextContainer } from '../../../components/ui/text-container';

export const VkAlbumEditPage: FunctionComponent = () => {
	document.title = 'Просмотр альбома'

	console.log('rerender PAGE!!!')

	return (
		<div className="vk-photo">
			<TextContainer>
				<h1>Сортировка фотографий альбома</h1>
			</TextContainer>
			<VkPhotoToolAlbumEdit />
		</div>
	)
}

export default VkAlbumEditPage
