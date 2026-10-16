import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

import { CityStarItem } from 'components/tourism/city-star/city-star-item'

type CityStarsIntroPropsType = {
	cityList: CityStarsType[] | null
}

export const CityStarIntro: FunctionComponent<CityStarsIntroPropsType> = ({
	cityList,
}) => {
	if (!cityList) {
		return null
	}

	const filtredCityList = cityList.filter(city => city.star.length === 5)

	return (
		<div className="tourism-city-star">
			{filtredCityList.map(city => (
				<CityStarItem
					key={city.title}
					title={city.title}
					star={city.star}
				/>
			))}
		</div>
	)
}
