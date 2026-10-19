import { FunctionComponent } from 'preact'
import { IntroImageMappingType } from 'utils.type'

import { Heading } from 'components/ui/heading/Heading'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'
import { TileList } from 'components/ui/tile-list'

import intersection from './img/intersection.svg'
import obuchenie    from './img/obuchenie.png'
import rak          from './img/rak.png'
import screen       from './img/screen.png'
import tech         from './img/tech.png'
import faq          from './img/faq.svg'

import { KNOWLEDGE_INVITE } from 'data/ivite-links/knowledge-invite'

import './style.css'

const imageMapping: IntroImageMappingType = {
	screen,
	rak,
	tech,
	obuchenie,
	intersection,
	faq,
}

export const KnowledgeInvite: FunctionComponent = () => (
	<PrecentationContainer className="share-knowledge">
		<TextContainer>
			<Heading variant="intro" level={2}>Делюсь знаниями</Heading>
		</TextContainer>

		<TextContainer>
			<TileList
				list={KNOWLEDGE_INVITE}
				imageMapping={imageMapping}
			/>
		</TextContainer>
	</PrecentationContainer>
)
