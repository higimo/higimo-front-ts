import { FunctionComponent } from 'preact'
import { CityStarsType } from 'api-types/city-stars.types'

import { CityStarItem } from 'components/tourism/city-star/city-star-item'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type CityStarListPropsType = {
	cityList: CityStarsType[] | null
}

// TODO: [BACKEND] сделать ссылки на города
export const CityStarList: FunctionComponent<CityStarListPropsType> = ({
	cityList
}) => cityList && (
	<div className="city-stars">
		<TextContainer>
			<div className="city-stars-gallery">
				{cityList.map(city => (
					<CityStarItem title={city.title} star={city.star} />
				))}
			</div>
		</TextContainer>
	</div>
)
