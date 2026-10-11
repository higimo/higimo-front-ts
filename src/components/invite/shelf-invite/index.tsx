import { FunctionComponent } from 'preact'

import { IntroHeader } from 'components/ui/intro-header'
import { TileGallery } from 'components/ui/tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import { ABOUT_INVITE } from 'data/ivite-links/about-invite'

import './style.css'

export const ShelfInvite: FunctionComponent = () => (
	<PrecentationContainer className="about-invite">
		<TextContainer>
			<IntroHeader>Мои полочки</IntroHeader>
		</TextContainer>

		<TextContainer>
			<TileGallery
				list={ABOUT_INVITE}
			/>
		</TextContainer>
	</PrecentationContainer>
)
