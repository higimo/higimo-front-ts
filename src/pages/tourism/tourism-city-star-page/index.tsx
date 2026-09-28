import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { CityStars } from 'components/tourism/city-stars'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismCityStarForm } from 'components/tourism/tourism-city-star'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import '../tourism-style.css'

export const TourismCityStarPage: FunctionComponent = () => {
	const [ cityList ] = useJsonApi<CityStarsType[]>('/json/city.json')

	return (
		<Layout title="Оценки городов">
			<div className="tourism-identy-page">
				<TourismMainMenu />

				<TextContainer>
					<Breadcrumps />
				</TextContainer>

				<TextContainer>
					<TourismHeader main>Оценки городов</TourismHeader>
				</TextContainer>

				<TourismCityStarForm />

				<LoadSuspense data={cityList}>
					<EmptyData data={cityList}>
						<CityStars cityList={cityList.data} />
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
