import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

type CityStarElementPropsType = CityStarsType

export const CityStarElement: FunctionComponent<CityStarElementPropsType> = (city) => (
	<div className="tourism-city-star__item">
		<div className="tourism-city-star__title">
			{city.title}
		</div>
		<div className="tourism-city-star__star">
			{city.star}
		</div>
	</div>
)
