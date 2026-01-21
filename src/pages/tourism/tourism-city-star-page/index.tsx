import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { CityStars } from 'components/tourism/city-stars'
import { TourismCityStarForm } from 'components/tourism-city-star'

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
