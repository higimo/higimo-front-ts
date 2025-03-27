import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { Breadcrumps } from '../../../components/ui/breadcrumps'
import { TextContainer } from '../../../components/ui/text-container'
import { TourismMainMenu } from '../../../components/tourism/tourism-main-menu'
import { CityStars } from '../../../components/tourism/city-stars'
import { TourismCityStarForm } from '../../../components/tourism-city-star'

import '../tourism-style.css'

export const TourismCityStarPage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'Оценки городов'
	
	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<TextContainer>
				<h1>Оценки городов</h1>
			</TextContainer>
			<TourismCityStarForm />
			<CityStars />
		</div>
	)
}
