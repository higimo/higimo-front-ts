import { FunctionComponent } from 'preact'
import { CinemaType } from 'api-types/cinema.types'

import { TextContainer } from 'components/ui/text-container'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type CinemaScriptItemPropsType = {
	cinemaItem: CinemaType | null
}

export const CinemaScriptItem: FunctionComponent<CinemaScriptItemPropsType> = ({
	cinemaItem
}) => cinemaItem && (
	<TextContainer>
		<h1>Из фильма «{cinemaItem.title}»</h1>
		<div
			dangerouslySetInnerHTML={{__html: cinemaItem.text}}
		/>
	</TextContainer>
)
