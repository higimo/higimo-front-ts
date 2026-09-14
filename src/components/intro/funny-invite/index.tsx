import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/intro/intro-header'
import { IntroTileGallery } from 'components/intro/intro-tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { funnyList } from 'dic/intra-links/funny-invite'

import './style.css'

export const FunnyIntro: FunctionComponent = () => (
	<PrecentationContainer className="funny-intro">
		<TextContainer>
			<IntroHeader>Поиграть</IntroHeader>
		</TextContainer>

		<TextContainer>
			<IntroTileGallery
				list={funnyList}
			/>
		</TextContainer>
	</PrecentationContainer>
)
