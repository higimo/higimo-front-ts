import { FunctionComponent } from 'preact'
import { CinemaType } from 'api-types/cinema.types'

import { TextContainer } from 'components/ui/text-container'

type CinemaScriptDetailPropsType = {
	cinemaScript: CinemaType
}
export const CinemaScriptDetail: FunctionComponent<CinemaScriptDetailPropsType> = ({ cinemaScript }) => {
	return (
		<TextContainer>
			<h1>Из фильма «{cinemaScript.title}»</h1>
			<div
				dangerouslySetInnerHTML={{__html: cinemaScript.text}}
			/>
		</TextContainer>
	)
}
