import { CityStarsType } from 'api-types/city-stars.types'

import { useJsonApi } from 'hook/use-json-api'

import { CityStarElement } from 'components/tourism/city-star-element'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import townImg from './img/town.svg'

export const CityStarsIntro = () => {
	const cityList = useJsonApi<CityStarsType[]>('/json/city.json')

	if (!cityList) {
		return <Loading />
	}

	const filtredCityList = cityList.filter(city => city.star.length === 5)

	return (
		<TextContainer>
			<h2><img className="tourism-visited-anons__icon--mini" src={townImg} /> <a href={ROUTE_LINKS.tourismCityIndex}>Оценка городов</a></h2>
			<div className="city-stars-gallery city-stars-gallery--card">
				{filtredCityList.map(city => (
					<CityStarElement title={city.title} star={city.star} />
				))}
			</div>
		</TextContainer>
	)
}
