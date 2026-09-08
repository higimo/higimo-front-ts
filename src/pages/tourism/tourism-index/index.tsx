import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { CityStarsIntro } from 'components/tourism/city-stars-intro'
import { FactoidRow } from 'components/ui/factoid-row'
import { NasheLineupGallery } from 'components/data/concert/nashe-lineup-gallery'
import { TextContainer } from 'components/ui/text-container'
import { TourismAdventure } from 'components/tourism/tourism-adventure'
import { TourismExperimentMaps } from 'components/tourism/tourism-experiment-maps'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismRow } from 'components/tourism/tourism-row'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'

import { ADVENTURES } from 'components/tourism/tourism-adventure/ADVENTURES'

import '../tourism-style.css'
import './style.css'
import { TourismAdventureEmpty } from 'components/tourism/tourism-adventure-empty'

// TODO: [FEATURE] хотелось бы так оформить своё посещённое https://www.tema.ru/travel/
export const TourismIndexPage: FunctionComponent = () => {
	usePageTitle('Туризм')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>
					Мои приключения
				</TourismHeader>
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
						// TODO: [LIGHT] добавить ссылку
						// {
						// 	→
						// 	Смотреть полностью
						// ROUTE_LINKS.tourismVisited
						// },
					]}
				/>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>
					Оценка городов
				</TourismHeader>
				<CityStarsIntro />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>
					Эксперименты в Я.Картах
				</TourismHeader>
				<TourismExperimentMaps />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>
					Конструктор карт
				</TourismHeader>
				<TourismWalkGallery />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary={true}>
					Нашествие
				</TourismHeader>
				<TourismSecondary>
					Путешествия — не только города, но и фестивали радости.
				</TourismSecondary>
				<NasheLineupGallery />
			</TextContainer>
		</div>
	)
}
