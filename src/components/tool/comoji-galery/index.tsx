import { FunctionComponent } from 'preact'
import { ComojiType } from 'api-types/comoji.types'

import { TextContainer } from 'components/ui/text-container'
import { ComojiElement } from 'components/tool/comoji-element'

import './style.css'

type ComojiGalery = {
	comojiList: ComojiType[] | null
}

export const ComojiGalery: FunctionComponent<ComojiGalery> = ({ comojiList }) => comojiList && (
	<TextContainer>
		<div className="gallery-comoji">
			{comojiList.map(item => <ComojiElement {...item} />)}
		</div>
	</TextContainer>
)
