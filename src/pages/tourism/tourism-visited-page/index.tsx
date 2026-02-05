import { useState } from 'preact/hooks'
import { useLazyLoadData } from 'hook/use-lazy-load-data'

import { usePageTitle } from 'hook/use-page-title'

import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { FullWidthContainer } from 'components/ui/full-width-container'
import { Switcher } from 'components/ui/switcher'
import { Tag } from 'components/ui/tag'

import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { PovType } from 'components/tourism/tourism-maps-figure/data/russia-city2'
import { TourismCardGeo } from 'components/tourism/tourism-card-geo'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { TourismStatisticMoscow } from 'components/tourism/tourism-statistic-moscow'
import { TourismStatisticMustPov } from 'components/tourism/tourism-statistic-must-pov'
import { TourismStatisticRussia } from 'components/tourism/tourism-statistic-russia'
import { TourismStatisticWorld } from 'components/tourism/tourism-statistic-world'
import { TourismTableGeo } from 'components/tourism/tourism-table-geo'

import { subjectPederationTypes, onlyPovTypes } from 'components/tourism/tourism-data/city-types'

import 'pages/tourism/tourism-style.css'
import './style.css'

const VISUALIZATOR_MAP = {
	MAP: 'MAP',
	CARD: 'CARD',
	TABLE: 'TABLE',
}

const VISITED_MAP = {
	INIT: 'INIT',
	VISITED: 'VISITED',
	WANTED: 'WANTED',
}

const TYPE_MAP = {
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
	INIT: 'INIT',
	VISITED: 'VISITED',
	WANTED: 'WANTED',
	ALPHABET: 'ALPHABET',
}

const typeFilters = {
	[TYPE_MAP.MOSCOW_ADM_ORKUG]: ['административный округ Москвы', 'округ Москвы'],
	[TYPE_MAP.MOSCOW_TOWN]: ['поселение Москвы'],
	[TYPE_MAP.MOSCOW_DISTRICT]: ['район Москвы'],
	[TYPE_MAP.METRO_MOSCOW]: ['метро Москвы'],
	[TYPE_MAP.FEDERATION_SUBJECT]: subjectPederationTypes,
	[TYPE_MAP.FEDERATION_REPUBLIC]: ['республика'],
	[TYPE_MAP.FEDERATION_KRAY]: ['край'],
	[TYPE_MAP.FEDERATION_OBLAST]: ['область'],
	[TYPE_MAP.FEDERATION_MEGACITY]: ['город федерального значения'],
	[TYPE_MAP.FEDERATION_AVTONOM]: ['автономный область', 'автономный округ'],
	[TYPE_MAP.ONLY_POV]: onlyPovTypes,
	[TYPE_MAP.DEAD_TOWN]: ['вымерший город'],
	[TYPE_MAP.CASTLE]: ['крепость'],
	[TYPE_MAP.CANYON]: ['каньон'],
	[TYPE_MAP.PARK]: ['парк'],
	[TYPE_MAP.MONASTERY]: ['монастырь'],
	[TYPE_MAP.QUARRY]: ['каменоломни'],
	[TYPE_MAP.CITY]: ['город'],
	[TYPE_MAP.VILLAGE]: ['деревня'],
	[TYPE_MAP.ZATO]: ['ЗАТО'],
}

const handleFilterMapPoint = (filter) => (item: PovType) => {
	// Посещённость
	if (filter.visited === VISITED_MAP.VISITED && 'visited' in item && !item.visited) return false
	if (filter.visited === VISITED_MAP.WANTED && 'visited' in item && item.visited) return false

	// Страна
	if (filter.type === TYPE_MAP.RUSSIA && 'country' in item && item.country !== 'Россия') return false
	if (filter.type === TYPE_MAP.WORLD && 'country' in item && item.country === 'Россия') return false

	if (typeFilters[filter.type] && !typeFilters[filter.type].includes(item.type)) {
		return false
	}

	return true
}

const handleSort = (sort) => (a: PovType, b: PovType) => {
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
	{ type: TYPE_MAP.TOTAL, label: 'Все' },

	{ type: TYPE_MAP.WORLD, label: 'Иностранное' },
	{ type: TYPE_MAP.RUSSIA, label: 'Россия' },

	{ type: TYPE_MAP.FEDERATION_SUBJECT, label: 'Субъекты федерации' },
	{ type: TYPE_MAP.FEDERATION_REPUBLIC, label: 'Республики' },
	{ type: TYPE_MAP.FEDERATION_KRAY, label: 'Края' },
	{ type: TYPE_MAP.FEDERATION_OBLAST, label: 'Области' },
	{ type: TYPE_MAP.FEDERATION_MEGACITY, label: 'Города федерального значения' },
	{ type: TYPE_MAP.FEDERATION_AVTONOM, label: 'Автономные области' },

	{ type: TYPE_MAP.MOSCOW_ADM_ORKUG, label: 'Округа Москвы' },
	{ type: TYPE_MAP.MOSCOW_TOWN, label: 'Поселения Москвы' },
	{ type: TYPE_MAP.MOSCOW_DISTRICT, label: 'Районы Москвы' },
	{ type: TYPE_MAP.METRO_MOSCOW, label: 'Станции метро Москвы' },

	{ type: TYPE_MAP.ONLY_POV, label: 'Точки интереса' },
	{ type: TYPE_MAP.DEAD_TOWN, label: 'Вымершие города' },
	{ type: TYPE_MAP.CASTLE, label: 'Крепости' },
	{ type: TYPE_MAP.CANYON, label: 'Каньоны' },
	{ type: TYPE_MAP.PARK, label: 'Парки' },
	{ type: TYPE_MAP.MONASTERY, label: 'Монастыри' },
	{ type: TYPE_MAP.QUARRY, label: 'Каменоломни' },
	{ type: TYPE_MAP.CITY, label: 'Города' },
	{ type: TYPE_MAP.VILLAGE, label: 'Деревни' },
	{ type: TYPE_MAP.ZATO, label: 'ЗАТО' }
]

// Следующим этапом подгружу оставшиеся списки для посещений: крепости, памятники, музеи, POI Москвы, станции метро Москвы. И введу метку «хочу». Потому что ЗАТО я хочу посетить только один — Центр подготовки космонавтов, но хорошо бы собрать и остальные. Когда дособеру — можно будет и на БД переносить.


// Наконец, надо задизайнить процесс, как писать «отчёты» о городах. Может быть, я начну с парочки в markdown, чтобы сформулировать стиль и форму.


export const TourismVisitedPage: FunctionComponent = () => {
	const stateData = useLazyLoadData<{ russiaCity: PovType[] }>(import('components/tourism/tourism-maps-figure/data/common'))
	const [visualizator, setVisualizator] = useState(VISUALIZATOR_MAP.CARD)
	const [filter, setFilter] = useState({
		visited: VISITED_MAP.INIT,
		type: TYPE_MAP.TOTAL,
	})
	const [sort, setSort] = useState(SORT_MAP.INIT)

	if ((stateData?.russiaCity?.length || 0) === 0) {
		return null
	}

	const totalStatistic = stateData.russiaCity.slice(0)

	const total = stateData.russiaCity.filter(handleFilterMapPoint(filter)).sort(handleSort(sort))

	usePageTitle('Результаты путешествий')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<TextContainer>
				<h1>Результаты путешествий</h1>
			</TextContainer>
			<TextContainer>
				<p>
					Я путешествую по спискам, где бы хотел побывать. Там города и отдельные места, например, Байкал и озеро Рица, парк Кудыкина гора. В России я бы хотел побывать во всех регионах и значимых городах. Ещё я хочу побывать во всех русских крепостях: кремли и замки вроде Изборска — они прекрасны.
				</p>
				<p>
					Под статистикой можно ознакомиться, где я ещё не был и вписаться со мной в путешествие)
				</p>
			</TextContainer>
			<TourismStatisticWorld total={totalStatistic} />
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
			</TextContainer>
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
