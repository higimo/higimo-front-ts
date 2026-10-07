import { FunctionComponent } from 'preact'

// TODO: [LIGHT] перенести в типы api CityStarsType уже вроде есть
type CityType = {
	title: string
	star: string
}

export const CityStarElement: FunctionComponent<CityType> = (city) => (
	<div className="tourism-city-star__item">
		<div className="tourism-city-star__title">
			{city.title}
		</div>
		<div className="tourism-city-star__star">
			{city.star}
		</div>
	</div>
)
