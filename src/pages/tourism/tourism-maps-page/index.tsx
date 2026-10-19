import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { useApi } from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Heading } from 'components/ui/heading/Heading'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismExperimentMapList } from 'components/tourism/tourism-experiment-maps'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismWalkList } from 'components/tourism/tourism-ya-constructor/tourism-walk-list'

import { API_ROUTE } from 'dic/route/API_ROUTE'

import '../tourism-style.css'

export const TourismMapListPage: FunctionComponent = () => {
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)

	return (
		<Layout title="Карты путешествий" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism">Карты путешествий</Heading>
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism" level={2}>Эксперименты в Я.Картах</Heading>
				<TourismExperimentMapList />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism" level={2}>Конструктор карт</Heading>
				<LoadSuspense data={yamapList}>
					<EmptyData data={yamapList}>
						<TourismWalkList
							yamapList={yamapList.data ?? []}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
