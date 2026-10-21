import { FunctionComponent } from 'preact'
import { CinemaType } from 'api-types/cinema.types'

import { TextContainer } from 'components/ui/text-container'

type CinemaScriptItemPropsType = {
	cinemaItem: CinemaType | null
}

// TODO: [LIGHT] вынести контейнер в page, если не всё
// TODO: [LIGHT] rename Datail
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
