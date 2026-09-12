import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { CityStars } from 'components/tourism/city-stars'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'
import { TourismCityStarForm } from 'components/tourism/tourism-city-star'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import '../tourism-style.css'

export const TourismCityStarPage: FunctionComponent = () => {
	usePageTitle('Оценки городов')

	const cityList = useJsonApi<CityStarsType[]>('/json/city.json')

	if (!cityList) {
		return <Loading />
	}

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Оценки городов</TourismHeader>
			</TextContainer>

			<TourismCityStarForm />

			<CityStars cityList={cityList} />
		</div>
	)
}
