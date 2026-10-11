import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { useApi } from 'hook/fetch/use-api'
import { useJsonApi } from 'hook/fetch/use-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { CityStarIntro } from 'components/tourism/city-star/city-star-intro'
import { EmptyData } from 'components/ui/empty-data'
import { FactoidList } from 'components/ui/factoid-list/FactoidList'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { NasheLineupList } from 'components/data/concert/nashe-lineup-list'
import { TextContainer } from 'components/ui/text-container'
import { TourismAdventure } from 'components/tourism/adventure/tourism-adventure'
import { TourismAdventureEmpty } from 'components/tourism/adventure/tourism-adventure-empty'
import { TourismExperimentMaps } from 'components/tourism/tourism-experiment-maps'
import { TourismHeader } from 'components/tourism/ui/tourism-header'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismRow } from 'components/tourism/ui/tourism-row'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'
import { TourismWalkGallery } from 'components/tourism/tourism-ya-constructor/tourism-walk-gallery'

import { ADVENTURE } from 'data/tourism/adventure'
import { API_ROUTE } from 'dic/route/API_ROUTE'
import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import '../tourism-style.css'
import './style.css'

// TODO: [FEATURE] хотелось бы так оформить своё посещённое https://www.tema.ru/travel/
export const TourismIndexPage: FunctionComponent = () => {
	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)
	const [ cityListJsonData ] = useJsonApi<CityStarsType[]>('/json/city.json')

	return (
		<Layout title="Туризм" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Мои приключения</TourismHeader>
				<TourismSecondary>
					Планирование путешествий, статистика, отчёты с впечатлениями, памятки
				</TourismSecondary>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Билеты в приключения</TourismHeader>
				<TourismRow>
					<TourismAdventure adventure={ADVENTURE[0]!} />
					<TourismAdventureEmpty />
				</TourismRow>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>
					Списки посещения и статистика
				</TourismHeader>
				<FactoidList
					mini
					countInRow={6}
					factoids={[
						// TODO: [BACKEND] получать данные из бекенда, когда сделаю
						{
							digit: 262,
							digitFrom: 'из 626',
							description: 'посещённых мест',
						},
						{
							digit: 258,
							digitFrom: 'из 621',
							description: 'посещено в РФ',
						},
						{
							digit: 35,
							digitFrom: 'из 88',
							description: 'регионов РФ',
						},
						{
							digit: 59,
							digitFrom: 'из 131',
							description: 'районов Москвы',
						},
						{
							digit: 120,
							digitFrom: 'из 435',
							description: 'станций метро Москвы',
						},
						{
							digit: '→',
							description: 'Смотреть полностью',
							href: ROUTE_LINK.tourismVisited,
						},
					]}
				/>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Оценка городов</TourismHeader>

				<LoadSuspense data={cityListJsonData}>
					<EmptyData data={cityListJsonData}>
						<CityStarIntro cityList={cityListJsonData.data} />
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Эксперименты в Я.Картах</TourismHeader>
				<TourismExperimentMaps />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Конструктор карт</TourismHeader>

				<LoadSuspense data={cityListJsonData}>
					<EmptyData data={cityListJsonData}>
						<TourismWalkGallery
							yamapList={yamapList.data}
						/>
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Нашествие</TourismHeader>
				<TourismSecondary>
					Путешествия — не только города, но и фестивали радости.
				</TourismSecondary>

				<NasheLineupList />
			</TextContainer>
		</Layout>
	)
}
