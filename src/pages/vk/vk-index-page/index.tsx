import { FunctionComponent } from 'preact'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TileGallery } from 'components/ui/tile-gallery'
import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { Heading } from 'components/ui/heading'

import { VK_PAGE_LIST } from 'data/vk-page-list'

import '../vk-style.css'

export const VkIndexPage: FunctionComponent = () => (
	<Layout title="VK tool index" className="vk-identity-page vk-photo">
		<TextContainer>
			<Breadcrumps />
		</TextContainer>

		<TextContainer>
			<Heading variant="vk">VK tool</Heading>

			<TileGallery
				list={VK_PAGE_LIST}
			/>
		</TextContainer>
	</Layout>
)
