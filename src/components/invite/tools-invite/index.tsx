import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/ui/intro-header'
import { TileGallery } from 'components/ui/tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINK } from 'dic/route/ANCHOR_LINK'
import { TOOL_LIST_DATA } from 'data/ivite-links/tools-invite'

import './style.css'

export const ToolsInvite: FunctionComponent = () => (
	<PrecentationContainer className="tools-intro" id={ANCHOR_LINK.service}>
		<TextContainer>
			<IntroHeader>Сделал сервисов</IntroHeader>
		</TextContainer>

		<TextContainer>
			<TileGallery
				list={TOOL_LIST_DATA}
			/>
		</TextContainer>
	</PrecentationContainer>
)
