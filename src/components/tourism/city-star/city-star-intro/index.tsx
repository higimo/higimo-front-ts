import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

import { CityStarItem } from 'components/tourism/city-star/city-star-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

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
				<CityStarItem title={city.title} star={city.star} />
			))}
		</div>
	)
}
