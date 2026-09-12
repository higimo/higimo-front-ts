import { FunctionComponent } from 'preact'
import { CityStarsType } from 'api-types/city-stars.types'

import { CityStarElement } from 'components/tourism/city-star-element'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

type CityStarsPropsType = {
	cityList: CityStarsType[]
}

// TODO: [BACKEND] сделать ссылки на города
export const CityStars: FunctionComponent<CityStarsPropsType> = ({ cityList }) => (
	<div className="city-stars">
		<TextContainer>
			<div className="city-stars-gallery">
				{cityList.map(city => (
					<CityStarElement title={city.title} star={city.star} />
				))}
			</div>
		</TextContainer>
	</div>
)
