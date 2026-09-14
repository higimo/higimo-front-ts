import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/intro/intro-header'
import { IntroTileGallery } from 'components/intro/intro-tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ANCHOR_LINKS } from 'dic/ANCHOR_LINKS'
import { toolListData } from 'dic/intra-links/tools-intro'

import './style.css'

export const ToolsIntro: FunctionComponent = () => (
	<PrecentationContainer className="tools-intro" id={ANCHOR_LINKS.service}>
		<TextContainer>
			<IntroHeader>Сделал сервисов</IntroHeader>
		</TextContainer>

		<TextContainer>
			<IntroTileGallery
				list={toolListData}
			/>
		</TextContainer>
	</PrecentationContainer>
)
