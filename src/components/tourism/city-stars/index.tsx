import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { useEffect, useState } from 'preact/hooks'

import { TextContainer } from 'components/ui/text-container'
import { CityStarElement } from 'components/tourism/city-star-element'

import './style.css'

const CITY_PREVIEW_DIC = {
	LIST: 'LIST',
	CARD: 'CARD',
}

type CityPreviewDicType = typeof CITY_PREVIEW_DIC[keyof typeof CITY_PREVIEW_DIC]

// TODO: [BACKEND] сделать ссылки на города
export const CityStars: FunctionComponent = () => {
	useEffect(() => {
		fetch('/json/city.json')
			.then(r => r.json())
			.then(data => {
				setCitys(data)
			})
	}, [])
	const [citys, setCitys] = useState([])
	const [mode, setMode] = useState<CityPreviewDicType>(CITY_PREVIEW_DIC.LIST)

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
					{citys.map(city => (
						<CityStarElement title={city.title} star={city.star} />
					))}
				</div>
			</TextContainer>
		</div>
	)
}
