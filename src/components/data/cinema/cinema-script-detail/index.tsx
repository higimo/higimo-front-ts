import { FunctionComponent } from 'preact'
import { CinemaType } from 'api-types/cinema.types'

import { TextContainer } from 'components/ui/text-container'

type CinemaScriptDetailPropsType = {
	cinemaItem: CinemaType | null
}
export const CinemaScriptDetail: FunctionComponent<CinemaScriptDetailPropsType> = ({
	cinemaItem
}) => cinemaItem && (
	<TextContainer>
		<h1>Из фильма «{cinemaItem.title}»</h1>
		<div
			dangerouslySetInnerHTML={{__html: cinemaItem.text}}
		/>
	</TextContainer>
)
