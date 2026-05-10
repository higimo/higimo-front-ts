import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { TextContainer } from 'components/ui/text-container'
import { CinemaIndex } from 'components/data/cinema/cinema-index'

export const CinemaIndexPage: FunctionComponent = () => {
	usePageTitle('Кино')

	return (
		<div className="cinema-page">
			<TextContainer>
				<h1>Я и фильмы</h1>
			</TextContainer>
			<CinemaIndex />
			<TextContainer>
				{/* TODO: [BACKEND] показать оценки фильмов и аниме */}
				Однажды, я выведу здесь оценки фильмов
			</TextContainer>
		</div>
	)
}
