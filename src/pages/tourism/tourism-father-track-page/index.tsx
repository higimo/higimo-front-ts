import { useLazyLoadData } from 'hook/use-lazy-load-data'
import { usePageTitle } from 'hook/use-page-title'

import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'

import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { PovType } from 'components/tourism/tourism-maps-figure/data/russia-city2'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { Coord } from 'components/tourism/tourism-maps-figure/data/father-track'

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

export const TourismFatherTrackPage: FunctionComponent = () => {
	const stateData = useLazyLoadData<{
        mainTrack: Coord[],
        cities: PovType[],
		rostovNaDonuPlace: PovType[],
    }>(import('components/tourism/tourism-maps-figure/data/father-track'))

    const lines = stateData?.mainTrack
    const cities = stateData?.cities
    const rostovNaDonuPlace = stateData?.rostovNaDonuPlace

    // const [visualizator, setVisualizator] = useState(VISUALIZATOR_MAP.CARD)
	// const [filter, setFilter] = useState({
	// 	visited: VISITED_MAP.INIT,
	// 	type: TYPE_MAP.TOTAL,
	// })
	// const [sort, setSort] = useState(SORT_MAP.INIT)

	// if ((stateData?.russiaCity?.length || 0) === 0) {
	// 	return null
	// }

	// const totalStatistic = stateData.russiaCity.slice(0)

	// const total = stateData.russiaCity.filter(handleFilterMapPoint(filter)).sort(handleSort(sort))

	usePageTitle('Результаты путешествий')

    if (!stateData) {
        return null
    }

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			{/* <Breadcrumps /> */}
			<TextContainer>
				<h1>Путешествие с отцом</h1>
			</TextContainer>
			<TextContainer className="car-list">
				74 часа на дорогу
				14 городов

				<h2>День 1</h2>
				<div>
					<div class="car-roadmap">10:00 Выезд из Нижнего Новгорода</div>
					<div class="car-teleport">1ч 30м</div>
					<div class="car-roadmap car-roadmap--maybe">11:30—14:30 3ч Выкса</div>
					<div class="car-teleport">8ч 50м</div>
					<div class="car-roadmap">18:50—23:00 5ч Саратов (21:50)</div>
					<div class="night-stay">Ночёвка в Саратове</div>
				</div>

				<h2>День 2</h2>
				<div>
					<div class="car-roadmap">10:00 Выезд из Саратова</div>
					<div class="car-teleport">6ч</div>
					<div class="car-roadmap">16:00—21:00 5ч Волгоград</div>
					<div class="night-stay">Ночёвка в Волгограде</div>
				</div>

				<h2>День 3</h2>
				<div>
					10:00 Выезд из Волгограда
					<div class="car-teleport">5ч</div>
					15:00—19:00 4ч Астрахань
					<div class="night-stay">Ночёвка в Астрахани</div>
				</div>

				<h2>День 4</h2>
				<div>
					10:00 Выезд из Астрахани
					<div class="car-teleport">4ч</div>
					14:00—17:00 3ч Элиста
					<div class="car-teleport">3ч</div>
					20:00—23:00 3ч Ставрополь
					<div class="night-stay">Ночёвка в Ставрополе</div>
				</div>

				<h2>День 5</h2>
				<div>
					10:00 Выезд из Ставрополя
					<div class="car-teleport">3ч</div>
					13:00—14:00 1ч Суворовские термальные ванны
					<div class="car-teleport">6ч (через Джилы-Су)</div>
					21:00—23:00 2ч Пятигорск / Черкесск / Невинномысск
					<div class="night-stay">Ночёвка</div>
				</div>

				<h2>День 6 (ночь в горах)</h2>
				<div>
					10:00 Выезд
					<div class="car-teleport">13ч</div>
					23:00 5ч Красная Поляна
					<div class="night-stay">Ночёвка в Красная Поляна</div>
				</div>

				<h2>День 7 (ночь на море)</h2>
				<div>
					10:00 Выезд из Красной поляны
					<div class="car-teleport">8ч</div>
					18:00—23:00 5ч Геленджик
					<div class="car-teleport">2ч</div>
					<div class="night-stay">Ночёвка в Геленджике</div>
					<div class="car-roadmap car-roadmap--maybe">11:30—14:30 3ч Выкса (за 8ч до Краснодара)</div>
				</div>

				<h2>День 8 (ночь в Ростове)</h2>
				<div>
					10:00 Выезд из Геленджика
					<div class="car-teleport">3ч</div>
					13:00—18:00 5ч Краснодар
					<div class="car-teleport">3ч</div>
					21:00—23:00 2ч Ростов-на-Дону
					<div class="night-stay">Ночёвка в Ростове-на-Дону</div>
				</div>

				<h2>День 9</h2>
				<div>
					10:00—11:00 1ч Ростов-на-Дону
					<div class="car-teleport">7ч</div>
					18:00—21:00 3ч Воронеж
					<div class="car-teleport">7ч</div>
					
				</div>
				<h2>21:00 Финиш в Москве</h2>
				<div>
					Орёл
					Курск
				</div>
			</TextContainer>
            <TourismMapGeo
                lines={lines}
                items={cities}
            />
			{/* <TextContainer>
                <p>
                    В порядке посещения: старт из НиНо, финиш в Москве
                </p>
				{FILTER_TAGS.map(({ type, label }) => (
					<Tag
						key={type}
						active={filter.type === type}
						onClick={() => setFilter(p => ({ ...p, type }))}
					>
						{label}
					</Tag>
				))}
			</TextContainer> */}
			{/* <FullWidthContainer className="tourism-visualizer-switcher">
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
			</FullWidthContainer> */}
			{/* <FullWidthContainer className="tourism-sort-filter">
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
			</FullWidthContainer> */}
            {/* b088ae4d-5981-487c-a750-e345aba7dd89 */}
			{/* {visualizator === VISUALIZATOR_MAP.MAP && } */}
		</div>
	)
}
