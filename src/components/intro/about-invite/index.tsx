import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/intro/intro-header'
import { IntroTileGallery } from 'components/intro/intro-tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { aboutInviteList } from 'dic/intra-links/about-invite'

import './style.css'

export const AboutInvite: FunctionComponent = () => (
	<PrecentationContainer className="about-invite">
		<TextContainer>
			<IntroHeader>Храню знания</IntroHeader>
		</TextContainer>

		<TextContainer>
			<IntroTileGallery
				list={aboutInviteList}
			/>
		</TextContainer>
	</PrecentationContainer>
)
