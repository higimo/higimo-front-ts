import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { VkPhotoToolAlbumEdit } from 'components/vk/vk-photo-tool-album-edit';
import { TextContainer } from 'components/ui/text-container';

import '../vk-style.css'

export const VkAlbumEditPage: FunctionComponent = () => {
	usePageTitle('Просмотр альбома')

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
