import { FunctionComponent } from 'preact'
import { CinemaType } from 'api-types/cinema.types'

type CinemaScriptItemPropsType = {
	cinemaItem: CinemaType | null
}

export const CinemaScriptDetail: FunctionComponent<CinemaScriptItemPropsType> = ({
	cinemaItem
}) => cinemaItem && (
	<>
		<h1>Из фильма «{cinemaItem.title}»</h1>
		<div
			dangerouslySetInnerHTML={{__html: cinemaItem.text}}
		/>
	</>
)
