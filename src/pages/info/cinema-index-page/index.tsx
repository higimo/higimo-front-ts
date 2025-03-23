import { FunctionComponent } from 'preact'

import { TextContainer } from '../../../components/ui/text-container'
import { CinemaIndex } from '../../../components/data/cinema/cinema-index'

export const CinemaIndexPage: FunctionComponent = () => {
	document.title = 'Кино'

	return (
		<div className="cinema-page">
			<TextContainer>
				<h1>Я и фильмы</h1>
			</TextContainer>
			<CinemaIndex />
			<TextContainer>
				Оценки фильмов бы ещё вывести
			</TextContainer>
		</div>
	)
}
