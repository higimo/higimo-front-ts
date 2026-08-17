import { FunctionComponent } from 'preact'

type CityType = {
	title: string
	star: string
}
export const CityStarElement: FunctionComponent<CityType> = (city) => {
	return (
		<div className="tourism-city-star__item">
			<div className="tourism-city-star__title">
				{city.title}
			</div>
			<div className="tourism-city-star__star">
				{city.star}
			</div>
		</div>
	)
}
