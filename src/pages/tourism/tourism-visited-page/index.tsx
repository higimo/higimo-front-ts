import { ValueOf } from 'utils.type'

import { useLazyLoadData } from 'hook/use-lazy-load-data'
import { useState } from 'preact/hooks'

import { usePageTitle } from 'hook/use-page-title'

import { FullWidthContainer } from 'components/ui/full-width-container'
import { Switcher } from 'components/ui/switcher'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'
import { FunctionComponent } from 'preact'

import { TourismCardGeo } from 'components/tourism/tourism-card-geo'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { PovType } from 'components/tourism/tourism-maps-figure/data/russia-city2'
import { TourismTableGeo } from 'components/tourism/tourism-table-geo'

import { onlyPovTypes, subjectPederationTypes } from 'components/tourism/tourism-data/city-types'

import 'pages/tourism/tourism-style.css'
import './style.css'

// Переключение визуализации
const VISUALIZATOR_MAP = {
	MAP:   'MAP',
	CARD:  'CARD',
	TABLE: 'TABLE',
}

const VISITED_MAP = {
	INIT:    'INIT',
	VISITED: 'VISITED',
	WANTED:  'WANTED',
}

const MAP_POINT_MAP = {
	TOTAL: 'TOTAL',
	RUSSIA: 'RUSSIA',
	WORLD: 'WORLD',
	MOSCOW_ADM_ORKUG: 'MOSCOW_ADM_ORKUG',
	MOSCOW_TOWN: 'MOSCOW_TOWN',
	MOSCOW_DISTRICT: 'MOSCOW_DISTRICT',
	METRO_MOSCOW: 'METRO_MOSCOW',
	FEDERATION_SUBJECT: 'FEDERATION_SUBJECT',
	FEDERATION_REPUBLIC: 'FEDERATION_REPUBLIC',
	FEDERATION_KRAY: 'FEDERATION_KRAY',
	FEDERATION_OBLAST: 'FEDERATION_OBLAST',
	FEDERATION_MEGACITY: 'FEDERATION_MEGACITY',
	FEDERATION_AVTONOM: 'FEDERATION_AVTONOM',
	ONLY_POV: 'ONLY_POV',
	DEAD_TOWN: 'DEAD_TOWN',
	CASTLE: 'CASTLE',
	CANYON: 'CANYON',
	PARK: 'PARK',
	MONASTERY: 'MONASTERY',
	QUARRY: 'QUARRY',
	CITY: 'CITY',
	VILLAGE: 'VILLAGE',
	ZATO: 'ZATO',
}

const SORT_MAP = {
	INIT:     'INIT',
	VISITED:  'VISITED',
	WANTED:   'WANTED',
	ALPHABET: 'ALPHABET',
}

const typeFilters = {
	[MAP_POINT_MAP.MOSCOW_ADM_ORKUG]: ['административный округ Москвы', 'округ Москвы'],
	[MAP_POINT_MAP.MOSCOW_TOWN]: ['поселение Москвы'],
	[MAP_POINT_MAP.MOSCOW_DISTRICT]: ['район Москвы'],
	[MAP_POINT_MAP.METRO_MOSCOW]: ['метро Москвы'],
	[MAP_POINT_MAP.FEDERATION_SUBJECT]: subjectPederationTypes,
	[MAP_POINT_MAP.FEDERATION_REPUBLIC]: ['республика'],
	[MAP_POINT_MAP.FEDERATION_KRAY]: ['край'],
	[MAP_POINT_MAP.FEDERATION_OBLAST]: ['область'],
	[MAP_POINT_MAP.FEDERATION_MEGACITY]: ['город федерального значения'],
	[MAP_POINT_MAP.FEDERATION_AVTONOM]: ['автономный область', 'автономный округ'],
	[MAP_POINT_MAP.ONLY_POV]: onlyPovTypes,
	[MAP_POINT_MAP.DEAD_TOWN]: ['вымерший город'],
	[MAP_POINT_MAP.CASTLE]: ['крепость'],
	[MAP_POINT_MAP.CANYON]: ['каньон'],
	[MAP_POINT_MAP.PARK]: ['парк'],
	[MAP_POINT_MAP.MONASTERY]: ['монастырь'],
	[MAP_POINT_MAP.QUARRY]: ['каменоломни'],
	[MAP_POINT_MAP.CITY]: ['город'],
	[MAP_POINT_MAP.VILLAGE]: ['деревня'],
	[MAP_POINT_MAP.ZATO]: ['ЗАТО'],
}

const handleFilterMapPoint = (filter: FilterStateType) => (item: PovType) => {
	// Посещённость
	if (filter.visited === VISITED_MAP.VISITED && 'visited' in item && !item.visited) return false
	if (filter.visited === VISITED_MAP.WANTED && 'visited' in item && item.visited) return false

	// Страна
	if (filter.type === MAP_POINT_MAP.RUSSIA && 'country' in item && item.country !== 'Россия') return false
	if (filter.type === MAP_POINT_MAP.WORLD && 'country' in item && item.country === 'Россия') return false

	// @ts-ignore
	if (typeFilters[filter.type] && !typeFilters[filter.type].includes(item.type)) {
		return false
	}

	return true
}

const handleSort = (sort: ValueOf<typeof SORT_MAP>) => (a: PovType, b: PovType) => {
	if (SORT_MAP.INIT === sort) {
		return 0
	}
	if (SORT_MAP.VISITED === sort) {
		// @ts-ignore
		return b.visited - a.visited
	}
	if (SORT_MAP.WANTED === sort) {
		// @ts-ignore
		return a.visited - b.visited
	}
	if (SORT_MAP.ALPHABET === sort) {
		return a.title.localeCompare(b.title)
	}
	return 0
}

const FILTER_TAGS = [
	{ type: MAP_POINT_MAP.TOTAL, label: 'Все' },

	{ type: MAP_POINT_MAP.WORLD, label: 'Иностранное' },
	{ type: MAP_POINT_MAP.RUSSIA, label: 'Россия' },

	{ type: MAP_POINT_MAP.FEDERATION_SUBJECT, label: 'Субъекты федерации' },
	{ type: MAP_POINT_MAP.FEDERATION_REPUBLIC, label: 'Республики' },
	{ type: MAP_POINT_MAP.FEDERATION_KRAY, label: 'Края' },
	{ type: MAP_POINT_MAP.FEDERATION_OBLAST, label: 'Области' },
	{ type: MAP_POINT_MAP.FEDERATION_MEGACITY, label: 'Города федерального значения' },
	{ type: MAP_POINT_MAP.FEDERATION_AVTONOM, label: 'Автономные области' },

	{ type: MAP_POINT_MAP.MOSCOW_ADM_ORKUG, label: 'Округа Москвы' },
	{ type: MAP_POINT_MAP.MOSCOW_TOWN, label: 'Поселения Москвы' },
	{ type: MAP_POINT_MAP.MOSCOW_DISTRICT, label: 'Районы Москвы' },
	{ type: MAP_POINT_MAP.METRO_MOSCOW, label: 'Станции метро Москвы' },

	{ type: MAP_POINT_MAP.ONLY_POV, label: 'Точки интереса' },
	{ type: MAP_POINT_MAP.DEAD_TOWN, label: 'Вымершие города' },
	{ type: MAP_POINT_MAP.CASTLE, label: 'Крепости' },
	{ type: MAP_POINT_MAP.CANYON, label: 'Каньоны' },
	{ type: MAP_POINT_MAP.PARK, label: 'Парки' },
	{ type: MAP_POINT_MAP.MONASTERY, label: 'Монастыри' },
	{ type: MAP_POINT_MAP.QUARRY, label: 'Каменоломни' },
	{ type: MAP_POINT_MAP.CITY, label: 'Города' },
	{ type: MAP_POINT_MAP.VILLAGE, label: 'Деревни' },
	{ type: MAP_POINT_MAP.ZATO, label: 'ЗАТО' }
]

// TODO: [FEATURE] Следующим этапом подгружу оставшиеся списки для посещений:
// крепости, памятники, музеи, POI Москвы, станции метро Москвы. И введу метку «хочу».
// Потому что ЗАТО я хочу посетить только один — Центр подготовки космонавтов, но хорошо бы собрать и остальные.
// Когда дособеру — можно будет и на БД переносить.

// TODO: [FEATURE] Наконец, надо задизайнить процесс, как писать «отчёты» о городах.
// Может быть, я начну с парочки в markdown, чтобы сформулировать стиль и форму.

type FilterStateType = {
	visited: ValueOf<typeof VISITED_MAP>,
	type: ValueOf<typeof MAP_POINT_MAP>,
}
export const TourismVisitedPage: FunctionComponent = () => {
	const stateData = useLazyLoadData<{ russiaCity: PovType[] }>(import('components/tourism/tourism-maps-figure/data/common'))









	const [visualizator, setVisualizator] = useState(VISUALIZATOR_MAP.CARD)
	// TODO: [USE_TAGS] useTags
	const [filter, setFilter] = useState<FilterStateType>({
		visited: VISITED_MAP.INIT,
		type: MAP_POINT_MAP.TOTAL,
	})
	// TODO: [USE_TAGS] useSort
	const [sort, setSort] = useState(SORT_MAP.INIT)










	if (!stateData) {
		return null
	}
	if ((stateData?.russiaCity?.length || 0) === 0) {
		return null
	}

	const totalStatistic = stateData.russiaCity.slice(0)

	const total = stateData.russiaCity.filter(handleFilterMapPoint(filter)).sort(handleSort(sort))

	usePageTitle('Результаты путешествий')

	return (
		<div className="tourism-identy-page">
			{/* <TourismMainMenu />
			<Breadcrumps />
			<TextContainer>
				<h1>Результаты путешествий</h1>
			</TextContainer> */}
			{/* <TextContainer>
				<p>
					Я путешествую по спискам, где бы хотел побывать. Там города и отдельные места, например, Байкал и озеро Рица, парк Кудыкина гора. В России я бы хотел побывать во всех регионах и значимых городах. Ещё я хочу побывать во всех русских крепостях: кремли и замки вроде Изборска — они прекрасны.
				</p>
				<p>
					Под статистикой можно ознакомиться, где я ещё не был и вписаться со мной в путешествие)
				</p>
			</TextContainer> */}
			{/* <TourismStatisticWorld total={totalStatistic} />
			<br /><br />
			<TourismStatisticRussia total={totalStatistic} />
			<br /><br />
			<TourismStatisticMustPov total={totalStatistic} />
			<br /><br />
			<TourismStatisticMoscow total={totalStatistic} />
			<br /><br />
			<TextContainer>
				<h2>Список для путешествий</h2>
				<p>
					Можно отобразить таблицей, карточками и посмотреть на карте. С белой подложкой то, где я уже был. Где не был — можно вписаться в путешествие)
				</p>
			</TextContainer> */}
			<TextContainer>
				{FILTER_TAGS.map(({ type, label }) => (
					<Tag
						key={type}
						active={filter.type === type}
						onClick={() => setFilter(p => ({ ...p, type }))}
					>
						{label}
					</Tag>
				))}
			</TextContainer>
			<FullWidthContainer className="tourism-visualizer-switcher">
				<Switcher
					options={[
						{
							title: 'Карточками',
							active: visualizator === VISUALIZATOR_MAP.CARD,
							onClick: () => setVisualizator(VISUALIZATOR_MAP.CARD)
						},
						{
							title: 'Таблицей',
							active: visualizator === VISUALIZATOR_MAP.TABLE,
							onClick: () => setVisualizator(VISUALIZATOR_MAP.TABLE)
						},
						{
							title: 'Картой',
							active: visualizator === VISUALIZATOR_MAP.MAP,
							onClick: () => setVisualizator(VISUALIZATOR_MAP.MAP)
						},
					]}
				/>
			</FullWidthContainer>
			<FullWidthContainer className="tourism-sort-filter">
				<Switcher
					options={[
						{
							title: 'Без сортировки',
							active: sort === SORT_MAP.INIT,
							onClick: () => setSort(SORT_MAP.INIT)
						},
						{
							title: 'Сначала посещённые',
							active: sort === SORT_MAP.VISITED,
							onClick: () => setSort(SORT_MAP.VISITED)
						},
						{
							title: 'Сначала непосещённые',
							active: sort === SORT_MAP.WANTED,
							onClick: () => setSort(SORT_MAP.WANTED)
						},
						{
							title: 'По алфавиту',
							active: sort === SORT_MAP.ALPHABET,
							onClick: () => setSort(SORT_MAP.ALPHABET)
						},
					]}
				/>
				<Switcher
					options={[
						{
							title: 'Все',
							active: filter.visited === VISITED_MAP.INIT,
							onClick: () => setFilter(p => ({...p, visited: VISITED_MAP.INIT }))
						},
						{
							title: 'Только посещённые',
							active: filter.visited === VISITED_MAP.VISITED,
							onClick: () => setFilter(p => ({...p, visited: VISITED_MAP.VISITED }))
						},
						{
							title: 'Только непосещённые',
							active: filter.visited === VISITED_MAP.WANTED,
							onClick: () => setFilter(p => ({...p, visited: VISITED_MAP.WANTED }))
						},
					]}
				/>
			</FullWidthContainer>
			{visualizator === VISUALIZATOR_MAP.TABLE && <TourismTableGeo items={total} />}
			{visualizator === VISUALIZATOR_MAP.MAP && <TourismMapGeo items={total} />}
			{visualizator === VISUALIZATOR_MAP.CARD && <TourismCardGeo items={total} />}
		</div>
	)
}
