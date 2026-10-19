import { FunctionComponent } from 'preact'

import { Heading } from 'components/ui/heading/Heading'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'
import { TileList } from 'components/ui/tile-list'

import { ABOUT_INVITE } from 'data/ivite-links/about-invite'

import './style.css'

export const ShelfInvite: FunctionComponent = () => (
	<PrecentationContainer className="about-invite">
		<TextContainer>
			<Heading variant="intro" level={2}>Мои полочки</Heading>
		</TextContainer>

		<TextContainer>
			<TileList
				list={ABOUT_INVITE}
			/>
		</TextContainer>
	</PrecentationContainer>
)
