import { FunctionComponent } from 'preact'
import { ComojiType } from 'api-types/comoji.types'

import { TextContainer } from 'components/ui/text-container'
import { ComojiItem } from 'components/tool/comoji/comoji-item'

import './style.css'

type ComojiListPropsType = {
	comojiList: ComojiType[]
}

export const ComojiList: FunctionComponent<ComojiListPropsType> = ({
	comojiList,
}) => (
	<TextContainer>
		<div className="gallery-comoji">
			{comojiList.map(item => (
				<ComojiItem key={item.id} {...item} />
			))}
		</div>
	</TextContainer>
)
