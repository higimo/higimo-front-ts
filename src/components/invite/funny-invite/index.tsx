import { FunctionComponent } from 'preact'

import { Heading } from 'components/ui/heading/Heading'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'
import { TileList } from 'components/ui/tile-list'

import { FUNNY_INVITE } from 'data/ivite-links/funny-invite'

import './style.css'

export const FunnyInvite: FunctionComponent = () => (
	<PrecentationContainer className="funny-intro">
		<TextContainer>
			<Heading variant="intro" level={2}>Поиграть</Heading>
		</TextContainer>

		<TextContainer>
			<TileList
				list={FUNNY_INVITE}
			/>
		</TextContainer>
	</PrecentationContainer>
)
