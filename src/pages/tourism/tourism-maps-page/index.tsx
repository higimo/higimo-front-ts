import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { useApi } from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismExperimentMaps } from 'components/tourism/tourism-experiment-maps'
import { TourismHeader } from 'components/tourism/ui/tourism-header'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismWalkList } from 'components/tourism/tourism-ya-constructor/tourism-walk-list'

import { API_ROUTE } from 'dic/route/API_ROUTE'

import '../tourism-style.css'

export const TourismMapsPage: FunctionComponent = () => {
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)

	return (
		<Layout title="Карты путешествий" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>
					Карты путешествий
				</TourismHeader>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Эксперименты в Я.Картах</TourismHeader>
				<TourismExperimentMaps />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Конструктор карт</TourismHeader>
				<LoadSuspense data={yamapList}>
					<EmptyData data={yamapList}>
						<TourismWalkList
							yamapList={yamapList.data}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>
		</Layout>
	)
}
