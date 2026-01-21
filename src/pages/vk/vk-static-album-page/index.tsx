import { FunctionComponent } from 'preact'
import { VkStaticAlbumsList } from 'components/vk/vk-static-albums-list'

import { usePageTitle } from 'hook/use-page-title'

export const VkStaticAlbumPage: FunctionComponent = () => {
	usePageTitle('Сервис фотографий ВКонтакте')

	return <VkStaticAlbumsList />
}

export default VkStaticAlbumPage
