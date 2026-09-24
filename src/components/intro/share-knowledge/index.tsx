import { IntroImageMappingType } from 'utils.type'

import { IntroHeader } from 'components/intro/intro-header'
import { IntroTileGallery } from 'components/intro/intro-tile-gallery'
import { PrecentationContainer } from 'components/ui/precentation-container'
import { TextContainer } from 'components/ui/text-container'

import intersection from './img/intersection.svg'
import obuchenie    from './img/obuchenie.png'
import rak          from './img/rak.png'
import screen       from './img/screen.png'
import tech         from './img/tech.png'
import faq          from './img/faq.svg'

import { shareKnowledgeData } from 'dic/intra-links/share-knowledge'

import './style.css'

const imageMapping: IntroImageMappingType = {
	screen,
	rak,
	tech,
	obuchenie,
	intersection,
	faq,
}

export const ShareKnowledge = () => (
	<PrecentationContainer className="share-knowledge">
		<TextContainer>
			<IntroHeader>Делюсь знаниями</IntroHeader>
		</TextContainer>

		<TextContainer>
			<IntroTileGallery
				list={shareKnowledgeData}
				imageMapping={imageMapping}
			/>
		</TextContainer>
	</PrecentationContainer>
)
