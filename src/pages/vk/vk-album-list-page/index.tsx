import { FunctionComponent } from 'preact'

import { VkPhotoAlbumList } from 'components/vk/vk-photo-tool-albums/index.js';
import { TextContainer } from 'components/ui/text-container/index.js';

import '../vk-style.css'

export const VkAlbumListPage: FunctionComponent = () => {
	document.title = 'Список альбомов'

	return (
		<div className="vk-photo">
			<TextContainer>
				<h1>Список альбомов</h1>
			</TextContainer>
			<VkPhotoAlbumList />
		</div>
	)
}
export default VkAlbumListPage
