import { FunctionComponent } from 'preact'
import { ComojiType } from 'api-types/comoji.types'

import { TextContainer } from 'components/ui/text-container'
import { ComojiItem } from 'components/tool/comoji/comoji-item'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type ComojiListPropsType = {
	comojiList: ComojiType[] | null
}

export const ComojiList: FunctionComponent<ComojiListPropsType> = ({ comojiList }) => comojiList && (
	<TextContainer>
		<div className="gallery-comoji">
			{comojiList.map(item => <ComojiItem {...item} />)}
		</div>
	</TextContainer>
)
