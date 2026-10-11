import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/ui/intro-header'
import { TileGallery } from 'components/ui/tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { FUNNY_INVITE } from 'data/ivite-links/funny-invite'

import './style.css'

export const FunnyInvite: FunctionComponent = () => (
	<PrecentationContainer className="funny-intro">
		<TextContainer>
			<IntroHeader>Поиграть</IntroHeader>
		</TextContainer>

		<TextContainer>
			<TileGallery
				list={FUNNY_INVITE}
			/>
		</TextContainer>
	</PrecentationContainer>
)
