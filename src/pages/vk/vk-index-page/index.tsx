import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { VkHeading } from 'components/vk/vk-heading'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../vk-style.css'

export const VkIndexPage: FunctionComponent = () => {
	usePageTitle('VK tool index')

	return (
		<div className="vk-identity-page vk-photo">
			<TextContainer>
				<VkHeading level={1}>VK tool</VkHeading>
				<ul>
					<li><a href={ROUTE_LINKS.toolVkDownloadAlbum}>Скачать фотки из альбома</a></li>
					<li><a href={ROUTE_LINKS.toolVkAlbums}>Мои альбомы</a></li>
				</ul>
			</TextContainer>
		</div>
	)
}

export default VkIndexPage
