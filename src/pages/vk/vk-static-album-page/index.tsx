import { FunctionComponent } from 'preact'
import { VkStaticAlbumsList } from '../../../components/vk/vk-static-albums-list'

export const VkStaticAlbumPage: FunctionComponent = () => {
	document.title = 'Сервис фотографий ВКонтакте'

	return <VkStaticAlbumsList />
}

export default VkStaticAlbumPage
