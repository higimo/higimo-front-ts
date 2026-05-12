import { KeyOf, ValueOf } from 'utils.type'

import { useLazyLoadData } from 'hook/use-lazy-load-data'
import { useMemo, useState } from 'preact/hooks'

import { usePageTitle } from 'hook/use-page-title'

import { FullWidthContainer } from 'components/ui/full-width-container'
import { Switcher } from 'components/ui/switcher'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'
import { FunctionComponent } from 'preact'

import { TourismCardGeo } from 'components/tourism/tourism-card-geo'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { PovType } from 'components/tourism/data/russia-city2'
import { TourismTableGeo } from 'components/tourism/tourism-table-geo'


import 'pages/tourism/tourism-style.css'
import './style.css'
import { VISITED_MAP, SORT_MAP, VISUALIZATOR_MAP } from './VISITED_MAP'
import { MAP_POINT_MAP, typeFilters } from './MAP_POINT_MAP'
import { TagCategory, useSmartTags } from 'hook/tags/use-smart-tags'
import { useSwitcher } from './useSwitcher'
import { FILTER_TAG_NAME_TO_KEY_MAP, FILTER_TAGS } from './FILTER_TAGS'

type HandleFilterMapPointPropsType = {
	selectedIds: Set<string>
	isChooseVisitedMode: (val: string) => boolean
}
const handleFilterMapPoint = ({ selectedIds, isChooseVisitedMode }: HandleFilterMapPointPropsType) => (item: PovType) => {
	if (selectedIds.has('Все')) {
		return true
	}

	if (isChooseVisitedMode(VISITED_MAP.VISITED) && 'visited' in item && !item.visited) {
		return false
	}
	if (isChooseVisitedMode(VISITED_MAP.WANTED) && 'visited' in item && !item.visited) {
		return false
	}

	if (selectedIds.has('Россия') || selectedIds.has('Иностранное')) {
		if ('country' in item) {
			if (selectedIds.has('Россия') && item.country !== 'Россия') {
				return false
			} else if (selectedIds.has('Иностранное') && item.country === 'Россия') {
				return false
			} else {
				return true
			}
		} else {
			return false
		}
	}

	for (const selectedTagTitle of selectedIds.values()) {
		const key = selectedTagTitle as keyof typeof FILTER_TAG_NAME_TO_KEY_MAP
		const mappingKey = FILTER_TAG_NAME_TO_KEY_MAP[key] as keyof typeof typeFilters
		const realTagName = typeFilters[mappingKey] as readonly string[]
		if (!realTagName.includes(item.type)) {
			return false
		}
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

export const TOURISM_VISITED_TAG_CATEGORY: TagCategory[] = [
	{
		group: {
			id: 1,
			title: 'Основной',
		},
		tags: FILTER_TAGS.map(({ label }, index) => ({
			id: index,
			title: label
		}))
	},
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
	usePageTitle('Результаты путешествий')


	// TODO: кажется, эта страница должна получать данные
	// И передавать их в два компонента
	// Один пусть считает статистику
	// Второй будет фильтровать данные и тегами заниматься
	const stateData = useLazyLoadData<{ russiaCity: PovType[] }>(import('components/tourism/data/common'))


	const {
		selectedIds,
		toggleTag,
		isSelected,
	} = useSmartTags({
		categories: TOURISM_VISITED_TAG_CATEGORY,
		mode: 'single',
		initialSelected: ['Все']
	})

	const [isChooseVisualizator, setVizualizator] = useSwitcher<ValueOf<typeof VISUALIZATOR_MAP>>(VISUALIZATOR_MAP.CARD)
	const [isChooseSortMode, setSortMode] = useSwitcher<ValueOf<typeof SORT_MAP>>(SORT_MAP.INIT)
	const [isChooseVisitedMode, setVisitedMode] = useSwitcher<ValueOf<typeof VISITED_MAP>>(VISITED_MAP.INIT)

	// TODO: преобразовать stateData.russiaCity, чтобы сразу были теги внутри





	// TODO: [USE_TAGS] useTags
	const [filter] = useState<FilterStateType>({
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
	const totalStatistic = stateData.russiaCity
	const filtredRussiaCity = useMemo(() =>
		stateData.russiaCity
			.filter(handleFilterMapPoint({
				selectedIds,
				isChooseVisitedMode,
			}))
			.sort(handleSort(sort))
		, [stateData.russiaCity, selectedIds, sort]
	)

	return (
		<div className="tourism-identy-page">
			<div>
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
			</div>
			<TextContainer>
				{TOURISM_VISITED_TAG_CATEGORY[0].tags.map((tag) => (
					<Tag key={tag.id} active={isSelected(tag.title)} onClick={toggleTag(tag.title)}>
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
					]}
				/>
			</FullWidthContainer>
			<FullWidthContainer className="tourism-sort-filter">
				<Switcher
					options={[
						{ title: 'Без сортировки',       active: isChooseSortMode(SORT_MAP.INIT),     onClick: setSortMode(SORT_MAP.INIT) },
						{ title: 'Сначала посещённые',   active: isChooseSortMode(SORT_MAP.VISITED),  onClick: setSortMode(SORT_MAP.VISITED) },
						{ title: 'Сначала непосещённые', active: isChooseSortMode(SORT_MAP.WANTED),   onClick: setSortMode(SORT_MAP.WANTED) },
						{ title: 'По алфавиту',          active: isChooseSortMode(SORT_MAP.ALPHABET), onClick: setSortMode(SORT_MAP.ALPHABET) },
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
			{isChooseVisualizator(VISUALIZATOR_MAP.TABLE) && <TourismTableGeo items={filtredRussiaCity} />}
			{isChooseVisualizator(VISUALIZATOR_MAP.MAP) && <TourismMapGeo items={filtredRussiaCity} />}
			{isChooseVisualizator(VISUALIZATOR_MAP.CARD) && <TourismCardGeo items={filtredRussiaCity} />}
		</div>
	)
}
