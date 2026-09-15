import { CityStarsType } from 'api-types/city-stars.types'
import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import useApi from 'hook/fetch/use-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { CityStarsIntro } from 'components/tourism/city-stars-intro'
import { FactoidRow } from 'components/ui/factoid-row'
import { Loading } from 'components/ui/loading'
import { NasheLineupGallery } from 'components/data/concert/nashe-lineup-gallery'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'
import { TourismAdventure } from 'components/tourism/tourism-adventure'
import { TourismAdventureEmpty } from 'components/tourism/tourism-adventure-empty'
import { TourismExperimentMaps } from 'components/tourism/tourism-experiment-maps'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismRow } from 'components/tourism/tourism-row'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'

import { ADVENTURES } from 'components/tourism/tourism-adventure/ADVENTURES'
import { API_ROUTE } from 'dic/API_ROUTE'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../tourism-style.css'
import './style.css'

// TODO: [FEATURE] хотелось бы так оформить своё посещённое https://www.tema.ru/travel/
export const TourismIndexPage: FunctionComponent = () => {
	usePageTitle('Туризм')

	const [ yamapList ] = useApi<YaMapType[]>(API_ROUTE.yamap)
	const isLoading = useLoadingState([yamapList.status])
	const isListEmpty = useEmptyDataState(yamapList.data)
	const cityList = useJsonApi<CityStarsType[]>('/json/city.json')

	if (isLoading || !cityList) {
		return <Loading />
	}

	return (
		<div className="tourism-identy-page">
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
				<TourismHeader secondary>
					Билеты в приключения
				</TourismHeader>
				<TourismRow>
					<TourismAdventure adventure={ADVENTURES[0]!} />
					<TourismAdventureEmpty />
				</TourismRow>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>
					Списки посещения и статистика
				</TourismHeader>
				<FactoidRow
					mini
					countInRow={6}
					factoids={[
						// TODO: неужели, это нужно прям писать? Откуда я это взял?
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
							href: ROUTE_LINKS.tourismVisited,
						},
					]}
				/>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Оценка городов</TourismHeader>
				<CityStarsIntro cityList={cityList} />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Эксперименты в Я.Картах</TourismHeader>
				<TourismExperimentMaps />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Конструктор карт</TourismHeader>
				{isListEmpty ? (
					<NotFoundData />
				) : (
					<TourismWalkGallery
						yamapList={yamapList.data}
					/>
				)}
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Нашествие</TourismHeader>
				<TourismSecondary>
					Путешествия — не только города, но и фестивали радости.
				</TourismSecondary>

				<NasheLineupGallery />
			</TextContainer>
		</div>
	)
}
