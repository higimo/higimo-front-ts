import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'

import { useJsonApi } from 'hook/fetch/use-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { CityStarList } from 'components/tourism/city-star/city-star-list'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismCityStarForm } from 'components/tourism/city-star/tourism-city-star'
import { Heading } from 'components/ui/heading/Heading'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'

import '../tourism-style.css'

export const TourismCityStarPage: FunctionComponent = () => {
	const [ cityListJsonData ] = useJsonApi<CityStarsType[]>('/json/city.json')

	return (
		<Layout title="Оценки городов" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism">Оценки городов</Heading>
			</TextContainer>

			<TourismCityStarForm />

			<LoadSuspense data={cityListJsonData}>
				<EmptyData data={cityListJsonData}>
					<CityStarList
						cityList={cityListJsonData.data ?? []}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
