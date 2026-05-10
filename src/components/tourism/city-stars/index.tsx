import { FunctionComponent } from 'preact'
import { ValueOf } from 'utils.type'
import { CityStarsType } from 'api-types/city-stars.types'

import cs from 'classnames'

import { useState } from 'preact/hooks'
import { useJsonApi } from 'hook/use-json-api'

import { CityStarElement } from 'components/tourism/city-star-element'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

const CITY_PREVIEW_DIC = {
	LIST: 'LIST',
	CARD: 'CARD',
} as const

// TODO: [BACKEND] сделать ссылки на города
export const CityStars: FunctionComponent = () => {
	const cityList = useJsonApi<CityStarsType[]>('/json/city.json')
	const [mode, setMode] = useState<ValueOf<typeof CITY_PREVIEW_DIC>>(CITY_PREVIEW_DIC.LIST)

	if (!cityList) {
		return <Loading />
	}

	return (
		<div className="city-stars">
			<TextContainer>
				<button
					onClick={() => setMode(CITY_PREVIEW_DIC.LIST)}
					className={cs('city-stars-toggle', {'city-stars-toggle--active': mode === CITY_PREVIEW_DIC.LIST})}
				>
					списком
				</button>
				<button
					onClick={() => setMode(CITY_PREVIEW_DIC.CARD)}
					className={cs('city-stars-toggle', {'city-stars-toggle--active': mode === CITY_PREVIEW_DIC.CARD})}
				>
					карточками
				</button>
			</TextContainer>
			<TextContainer>
				<div
						className={cs(
							'city-stars-gallery',
							{
								'city-stars-gallery--list': mode === CITY_PREVIEW_DIC.LIST,
								'city-stars-gallery--card': mode === CITY_PREVIEW_DIC.CARD,
							}
						)}
				>
					{cityList.map(city => (
						<CityStarElement title={city.title} star={city.star} />
					))}
				</div>
			</TextContainer>
		</div>
	)
}
