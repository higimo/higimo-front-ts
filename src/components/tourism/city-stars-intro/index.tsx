import { CityStarsType } from 'api-types/city-stars.types'

import { useJsonApi } from 'hook/use-json-api'

import { CityStarElement } from 'components/tourism/city-star-element'
import { Loading } from 'components/ui/loading'

export const CityStarsIntro = () => {
	const cityList = useJsonApi<CityStarsType[]>('/json/city.json')

	if (!cityList) {
		return <Loading />
	}

	const filtredCityList = cityList.filter(city => city.star.length === 5)

	return (
		<div className="tourism-city-star">
			{filtredCityList.map(city => (
				<CityStarElement title={city.title} star={city.star} />
			))}
		</div>
	)
}
