import { Route } from 'preact-iso'

import { VkAlbumEditPage } from 'pages/vk/vk-album-edit-page'
import { VkAlbumListPage } from 'pages/vk/vk-album-list-page'
import { VkDownloadPage } from 'pages/vk/vk-download-page'
import { VkIndexPage } from 'pages/vk/vk-index-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// VK тулы
export const vkToolPages = [
	<Route path={ROUTE_LINKS.toolVkIndex} component={VkIndexPage} />,
	<Route path={ROUTE_LINKS.toolVkAlbums} component={VkAlbumListPage} />,
	<Route path={ROUTE_LINKS.toolVkAlbumSingle_CONST} component={VkAlbumEditPage} />,
	<Route path={ROUTE_LINKS.toolVkDownloadAlbum} component={VkDownloadPage} />,
]
