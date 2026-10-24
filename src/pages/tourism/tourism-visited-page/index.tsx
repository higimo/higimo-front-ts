import {
	AdmOrkugMoscow,
	Castle,
	Country,
	DistrictMoscow,
	Placefield,
	PoiType,
	SubjectFederation,
	Town,
	TownMoscow,
} from 'api-types/tourism.types'
import { FunctionComponent } from 'preact'
import { ValueOf } from 'utils.type'

import { useMemo } from 'preact/hooks'
import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'
import { useSmartTags } from 'hook/tags/use-smart-tags'
import { useSwitcher } from 'hook/use-switcher'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { FullWidthContainer } from 'components/ui/full-width-container/FullWidthContainer'
import { Heading } from 'components/ui/heading'
import { Layout } from 'components/ui/layout/Layout'
import { Switcher } from 'components/ui/switcher/Switcher'
import { Tag } from 'components/ui/tag/Tag'
import { TextContainer } from 'components/ui/text-container'
import { TourismCardGeoList } from 'components/tourism/tourism-card-geo-list'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'
import { TourismStatisticMoscow } from 'components/tourism/tourism-statistic/tourism-statistic-moscow'
import { TourismStatisticMustPoi } from 'components/tourism/tourism-statistic/tourism-statistic-must-poi'
import { TourismStatisticRussia } from 'components/tourism/tourism-statistic/tourism-statistic-russia'
import { TourismStatisticWorld } from 'components/tourism/tourism-statistic/tourism-statistic-world'
import { TourismTableGeo } from 'components/tourism/tourism-table-geo'

import { handleFilterMapPoint } from 'utils/tourism/handle-filter-map-point'
import { handleMapSort } from 'utils/tourism/handle-map-sort'
import { placemarkOptionStyle } from 'utils/tourism/placemark-option-style'
import { placemarkPropertyStyle } from 'utils/tourism/placemark-property-style'

import { TORUSM_SORT_MAP } from 'dic/tourism/TORUSM_SORT_MAP'
import { TOURISM_VISITED_TAG_CATEGORY } from 'dic/tourism/TOURISM_VISITED_TAG_CATEGORY'
import { VISITED_MAP } from 'dic/tourism/VISITED_MAP'
import { VISUALIZATOR_MAP } from 'dic/tourism/VISUALIZATOR_MAP'

import '../tourism-style.css'
import './style.css'

// TODO: [FEATURE_MAP] Следующим этапом подгружу оставшиеся списки для посещений:
// крепости, памятники, музеи, POI Москвы, станции метро Москвы. И введу метку «хочу».
// Потому что ЗАТО я хочу посетить только один — Центр подготовки космонавтов, но хорошо бы собрать и остальные.
// Когда дособеру — можно будет и на БД переносить.
// TODO: [FEATURE_MAP] Наконец, надо задизайнить процесс, как писать «отчёты» о городах.
// Может быть, я начну с парочки в markdown, чтобы сформулировать стиль и форму.

type VisitedDataType = {
	admOrkugMoscow: AdmOrkugMoscow[]
	castle: Castle[]
	country: Country[]
	districtMoscow: DistrictMoscow[]
	placefield: Placefield[]
	subjectFederation: SubjectFederation[]
	townMoscow: TownMoscow[]
	town: Town[]
}

export const TourismVisitedPage: FunctionComponent = () => {
	// TODO: [BACKEND] вынести в бекенд API из JSON
	const [ jsonCollection ] = useMultiJsonApi<VisitedDataType>({
		admOrkugMoscow:    '/json/tourism/admin-okrug-moscow.json',
		castle:            '/json/tourism/castle.json',
		country:           '/json/tourism/country.json',
		districtMoscow:    '/json/tourism/district-moscow.json',
		placefield:        '/json/tourism/placefield.json',
		subjectFederation: '/json/tourism/subject-federation.json',
		townMoscow:        '/json/tourism/town-moscow.json',
		town:              '/json/tourism/town.json',
	})

	const poiList: PoiType[] = ([] as PoiType[])
		.concat(jsonCollection.admOrkugMoscow.data || [])
		.concat(jsonCollection.castle.data || [])
		.concat(jsonCollection.country.data || [])
		.concat(jsonCollection.districtMoscow.data || [])
		.concat(jsonCollection.placefield.data || [])
		.concat(jsonCollection.subjectFederation.data || [])
		.concat(jsonCollection.townMoscow.data || [])
		.concat(jsonCollection.town.data || [])

	const {
		selectedTagTitles, toggleTag, isSelected,
	} = useSmartTags({
		categories: TOURISM_VISITED_TAG_CATEGORY,
		mode: 'single',
		initialSelected: ['Все']
	})

	const [isChooseVisualizator, setVizualizator] = useSwitcher<ValueOf<typeof VISUALIZATOR_MAP>>(VISUALIZATOR_MAP.CARD)
	const [isChooseSortMode, setSortMode] = useSwitcher<ValueOf<typeof TORUSM_SORT_MAP>>(TORUSM_SORT_MAP.INIT)
	const [isChooseVisitedMode, setVisitedMode] = useSwitcher<ValueOf<typeof VISITED_MAP>>(VISITED_MAP.INIT)

	const filtredRussiaCity = useMemo(
		() => poiList
			.filter(handleFilterMapPoint({
				selectedIds: selectedTagTitles,
				isChooseVisitedMode,
			}))
			.sort(handleMapSort(isChooseSortMode)),
		[poiList, selectedTagTitles, isChooseVisitedMode, isChooseSortMode]
	)

	return (
		<Layout title="Результаты путешествий" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism" level={1}>Результаты путешествий</Heading>
			</TextContainer>

			<TextContainer>
				<TourismSecondary main>
					Я путешествую по спискам, где бы хотел побывать. Там города и отдельные места, например, Байкал и озеро Рица, парк Кудыкина гора. В России я бы хотел побывать во всех регионах и значимых городах. Ещё я хочу побывать во всех русских крепостях: кремли и замки вроде Изборска — они прекрасны.
				</TourismSecondary>
				<TourismSecondary main>
					Под статистикой можно ознакомиться, где я ещё не был и вписаться со мной в путешествие)
				</TourismSecondary>
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism" level={1}>Статистика по миру</Heading>
				<TourismSecondary>
					Сколько мест посетил из намеченного списка. И как называется список.
				</TourismSecondary>
			</TextContainer>
			<TourismStatisticWorld total={poiList} />

			<TextContainer>
				<Heading variant="tourism" level={1}>По России</Heading>
			</TextContainer>
			<TourismStatisticRussia total={poiList} />

			<TextContainer>
				<Heading variant="tourism" level={1}>Впечатляющие места</Heading>
				<TourismSecondary>
					Здесь нет городов, где живут люди. Только точки интереса на карте, куда мне интересно попасть
				</TourismSecondary>
			</TextContainer>
			<TourismStatisticMustPoi total={poiList} />

			<TextContainer>
				<Heading variant="tourism" level={1}>По Москве</Heading>
				<TourismSecondary>
					Я очень люблю Москву. Она — Русское поле экспериментов. Например, в Курьяново построили двухэтажные домики, которые стали прообразом для застройки моей родной Шахуньи. Поэтому, мне важно побывать во всех округах и районах Москвы, на всех станциях метро. А ещё я хочу обойти кажду улицу внутри МКАД.
				</TourismSecondary>
			</TextContainer>
			<TourismStatisticMoscow total={poiList} />

			<TextContainer>
				<Heading variant="tourism" level={1}>Список для путешествий</Heading>
				<TourismSecondary>
					Можно отобразить таблицей, карточками и посмотреть на карте. С белой подложкой то, где я уже был. Где не был — можно вписаться в путешествие)
				</TourismSecondary>
			</TextContainer>

			<TextContainer>
				{TOURISM_VISITED_TAG_CATEGORY[0]?.tags.map((tag) => (
					<Tag
						key={tag.id}
						active={isSelected(tag.title)}
						onClick={toggleTag(tag.title)}
					>
						{tag.title}
					</Tag>
				))}
			</TextContainer>

			<FullWidthContainer className="tourism-visualizer-switcher">
				<Switcher
					options={[
						{ title: 'Карточками', active: isChooseVisualizator(VISUALIZATOR_MAP.CARD),  onClick: setVizualizator(VISUALIZATOR_MAP.CARD) },
						{ title: 'Таблицей',   active: isChooseVisualizator(VISUALIZATOR_MAP.TABLE), onClick: setVizualizator(VISUALIZATOR_MAP.TABLE) },
						{ title: 'Картой',     active: isChooseVisualizator(VISUALIZATOR_MAP.MAP),   onClick: setVizualizator(VISUALIZATOR_MAP.MAP) },
					]} />
			</FullWidthContainer>

			<FullWidthContainer className="tourism-sort-filter">
				<Switcher
					options={[
						{ title: 'Без сортировки',       active: isChooseSortMode(TORUSM_SORT_MAP.INIT),     onClick: setSortMode(TORUSM_SORT_MAP.INIT) },
						{ title: 'Сначала посещённые',   active: isChooseSortMode(TORUSM_SORT_MAP.VISITED),  onClick: setSortMode(TORUSM_SORT_MAP.VISITED) },
						{ title: 'Сначала непосещённые', active: isChooseSortMode(TORUSM_SORT_MAP.WANTED),   onClick: setSortMode(TORUSM_SORT_MAP.WANTED) },
						{ title: 'По алфавиту',          active: isChooseSortMode(TORUSM_SORT_MAP.ALPHABET), onClick: setSortMode(TORUSM_SORT_MAP.ALPHABET) },
					]}
				/>
				<Switcher
					options={[
						{ title: 'Все',                 active: isChooseVisitedMode(VISITED_MAP.INIT),    onClick: setVisitedMode(VISITED_MAP.INIT), },
						{ title: 'Только посещённые',   active: isChooseVisitedMode(VISITED_MAP.VISITED), onClick: setVisitedMode(VISITED_MAP.VISITED), },
						{ title: 'Только непосещённые', active: isChooseVisitedMode(VISITED_MAP.WANTED),  onClick: setVisitedMode(VISITED_MAP.WANTED), },
					]}
				/>
			</FullWidthContainer>

			{isChooseVisualizator(VISUALIZATOR_MAP.TABLE) && (
				<TourismTableGeo items={filtredRussiaCity} />
			)}
			{isChooseVisualizator(VISUALIZATOR_MAP.MAP) && (
				<TourismMapGeo
					items={filtredRussiaCity}
					propertyHandler={placemarkPropertyStyle}
					optionHandler={placemarkOptionStyle}
				/>
			)}
			{isChooseVisualizator(VISUALIZATOR_MAP.CARD) && (
				<TourismCardGeoList items={filtredRussiaCity} />
			)}
		</Layout>
	)
}
