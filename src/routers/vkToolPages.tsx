import { Route } from 'preact-iso'

import { VkAlbumEditPage } from 'pages/vk/vk-album-edit-page'
import { VkAlbumListPage } from 'pages/vk/vk-album-list-page'
import { VkDownloadPage } from 'pages/vk/vk-download-page'
import { VkIndexPage } from 'pages/vk/vk-index-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// VK тулы
export const vkToolPages = [
	<Route path={ROUTE_LINK.toolVkIndex} component={VkIndexPage} />,
	<Route path={ROUTE_LINK.toolVkAlbums} component={VkAlbumListPage} />,
	<Route path={ROUTE_LINK.toolVkAlbumSingle_CONST} component={VkAlbumEditPage} />,
	<Route path={ROUTE_LINK.toolVkDownloadAlbum} component={VkDownloadPage} />,
]
