import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { IntroTileGallery } from 'components/intro/intro-tile-gallery'
import { TextContainer } from 'components/ui/text-container'
import { VkHeading } from 'components/vk/vk-heading'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../vk-style.css'

const pagesList = [
	{
		title: 'Скачать фотки из альбома',
		description: 'Инструмент выгрузки ссылок на файлы картинок',
		href: ROUTE_LINKS.toolVkDownloadAlbum,
	},
	{
		title: 'Редактирование альбомов',
		description: 'Сортировка и описания фотографий в более удобном для массового редактирования виде',
		href: ROUTE_LINKS.toolVkAlbums,
	}
]
export const VkIndexPage: FunctionComponent = () => {
	usePageTitle('VK tool index')

	return (
		<div className="vk-identity-page vk-photo">
			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<VkHeading>VK tool</VkHeading>

				<IntroTileGallery
					list={pagesList}
				/>
			</TextContainer>
		</div>
	)
}
