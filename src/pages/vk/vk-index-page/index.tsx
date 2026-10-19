import { FunctionComponent } from 'preact'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Heading } from 'components/ui/heading'
import { Layout } from 'components/ui/layout/Layout'
import { TextContainer } from 'components/ui/text-container'
import { TileList } from 'components/ui/tile-list'

import { VK_PAGE_LIST } from 'data/vk-page-list'

import '../vk-style.css'

export const VkIndexPage: FunctionComponent = () => (
	<Layout title="VK tool index" className="vk-identity-page vk-photo">
		<TextContainer>
			<Breadcrumps />
		</TextContainer>

		<TextContainer>
			<Heading variant="vk">VK tool</Heading>

			<TileList
				list={VK_PAGE_LIST}
			/>
		</TextContainer>
	</Layout>
)
