import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { CityStars } from 'components/tourism/city-stars'
import { TextContainer } from 'components/ui/text-container'
import { TourismCityStarForm } from 'components/tourism/tourism-city-star'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import '../tourism-style.css'

export const TourismCityStarPage: FunctionComponent = () => {
	usePageTitle('Оценки городов')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<TextContainer>
				<h1>Оценки городов</h1>
			</TextContainer>
			<TourismCityStarForm />
			<CityStars />
		</div>
	)
}
