import { IntroImageMappingType } from 'utils.type'

import { IntroHeader } from 'components/ui/intro-header'
import { TileGallery } from 'components/ui/tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

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

export const KnowledgeInvite = () => (
	<PrecentationContainer className="share-knowledge">
		<TextContainer>
			<IntroHeader>Делюсь знаниями</IntroHeader>
		</TextContainer>

		<TextContainer>
			<TileGallery
				list={KNOWLEDGE_INVITE}
				imageMapping={imageMapping}
			/>
		</TextContainer>
	</PrecentationContainer>
)
