import { FunctionComponent } from 'preact'
import { CityStarsType } from 'api-types/city-stars.types'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { CityStarElement } from 'components/tourism/city-star-element'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'

import './style.css'

// TODO: [BACKEND] сделать ссылки на города
export const CityStars: FunctionComponent = () => {
	const cityList = useJsonApi<CityStarsType[]>('/json/city.json')

	if (!cityList) {
		return <Loading />
	}

	return (
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
}
