import { FunctionComponent } from 'preact'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'

import '../vk-style.css'

export const VkIndexPage: FunctionComponent = () => {
	document.title = 'VK tool index'

	return (
		<div className="vk-photo">
			<h1>VK tool</h1>
			<ul>
				<li><a href={ROUTE_LINKS.toolVkStaticAlbum}>Статичные альбомы</a></li>
				<li><a href={ROUTE_LINKS.toolVkDownloadAlbum}>Скачать фотки из альбома</a></li>
				<li><a href={ROUTE_LINKS.toolVkAlbums}>Мои альбомы</a></li>
			</ul>
		</div>
	)
}

export default VkIndexPage