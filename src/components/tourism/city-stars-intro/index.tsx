import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

import { CityStarElement } from 'components/tourism/city-star-element'

type CityStarsIntroPropsType = {
	cityList: CityStarsType[]
}

export const CityStarsIntro: FunctionComponent<CityStarsIntroPropsType> = ({
	cityList,
}) => {
	const filtredCityList = cityList.filter(city => city.star.length === 5)

	return (
		<div className="tourism-city-star">
			{filtredCityList.map(city => (
				<CityStarElement title={city.title} star={city.star} />
			))}
		</div>
	)
}
