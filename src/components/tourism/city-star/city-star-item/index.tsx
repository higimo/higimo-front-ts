import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

type CityStarItemPropsType = CityStarsType

export const CityStarItem: FunctionComponent<CityStarItemPropsType> = (city) => (
	<div className="city-star-list__item">
		<div className="city-star-list__title">
			{city.title}
		</div>
		<div className="city-star-list__star">
			{city.star}
		</div>
	</div>
)
