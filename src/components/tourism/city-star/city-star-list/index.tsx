import { FunctionComponent } from 'preact'
import { CityStarsType } from 'api-types/city-stars.types'

import { CityStarItem } from 'components/tourism/city-star/city-star-item'

import cs from 'classnames'

import './style.css'

type CityStarListPropsType = {
	cityList: CityStarsType[]
	variant?: 'vertical' | 'horizontal'
}

// TODO: [BACKEND] сделать ссылки на города
export const CityStarList: FunctionComponent<CityStarListPropsType> = ({
	cityList,
	variant = 'vertical',
}) => (
	<div className={cs('city-star-list', {
		'city-star-list--horizontal': variant === 'horizontal'
	})}>
		{cityList.map(city => (
			<CityStarItem
				key={city.title}
				title={city.title}
				star={city.star}
			/>
		))}
	</div>
)
