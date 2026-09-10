import { FunctionComponent } from 'preact'
import { ComojiType } from 'api-types/comoji.types'

import { TextContainer } from 'components/ui/text-container'
import { ComojiElement } from 'components/tool/comoji-element'

import './style.css'

type ComojiGalery = {
	comoji: ComojiType[]
}

export const ComojiGalery: FunctionComponent<ComojiGalery> = ({ comoji }) => (
	<TextContainer>
		<div className="gallery-comoji">
			{comoji.map(item => <ComojiElement {...item} />)}
		</div>
	</TextContainer>
)
