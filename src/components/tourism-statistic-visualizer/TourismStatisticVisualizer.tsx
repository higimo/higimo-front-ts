import { Fragment, FunctionComponent } from 'preact'
import { ValueOf } from 'utils.type'

import { useSmartTags } from 'hook/tags/use-smart-tags'
import { useSwitcher } from 'hook/useSwitcher'
import { useMemo, useState } from 'preact/hooks'

import { PovType } from 'components/tourism/data/russia-city2'
import { TourismCardGeo } from 'components/tourism/tourism-card-geo'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { TourismTableGeo } from 'components/tourism/tourism-table-geo'
import { FullWidthContainer } from 'components/ui/full-width-container'
import { Switcher } from 'components/ui/switcher'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import { TOURISM_VISITED_TAG_CATEGORY, handleFilterMapPoint, handleSort } from 'components/tourism-statistic-visualizer/handleFilterMapPoint'
import { SORT_MAP, VISITED_MAP, VISUALIZATOR_MAP } from 'components/tourism/VISITED_MAP'

type TourismStatisticVisualizerPropsType = {
	pov: PovType[]
}
export const TourismStatisticVisualizer: FunctionComponent<TourismStatisticVisualizerPropsType> = ({ pov }) => {
	const {
		selectedIds, toggleTag, isSelected,
	} = useSmartTags({
		categories: TOURISM_VISITED_TAG_CATEGORY,
		mode: 'single',
		initialSelected: ['Все']
	})

	const [isChooseVisualizator, setVizualizator] = useSwitcher<ValueOf<typeof VISUALIZATOR_MAP>>(VISUALIZATOR_MAP.CARD)
	const [isChooseSortMode, setSortMode] = useSwitcher<ValueOf<typeof SORT_MAP>>(SORT_MAP.INIT)
	const [isChooseVisitedMode, setVisitedMode] = useSwitcher<ValueOf<typeof VISITED_MAP>>(VISITED_MAP.INIT)

	// TODO: преобразовать stateData.russiaCity, чтобы сразу были теги внутри

	// TODO: [USE_TAGS] useSort
	const [sort, setSort] = useState(SORT_MAP.INIT)

	const filtredRussiaCity = useMemo(() => pov
		.filter(handleFilterMapPoint({
			selectedIds,
			isChooseVisitedMode,
		}))
		// TODO: перестало работать, надо использовать isChooseSortMode
		.sort(handleSort(sort)),
		[pov, selectedIds, sort]
	)

	return (
		<Fragment>
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
						{ title: 'Карточками', active: isChooseVisualizator(VISUALIZATOR_MAP.CARD), onClick: setVizualizator(VISUALIZATOR_MAP.CARD) },
						{ title: 'Таблицей', active: isChooseVisualizator(VISUALIZATOR_MAP.TABLE), onClick: setVizualizator(VISUALIZATOR_MAP.TABLE) },
						{ title: 'Картой', active: isChooseVisualizator(VISUALIZATOR_MAP.MAP), onClick: setVizualizator(VISUALIZATOR_MAP.MAP) },
					]} />
			</FullWidthContainer>
			<FullWidthContainer className="tourism-sort-filter">
				<Switcher
					options={[
						{ title: 'Без сортировки', active: isChooseSortMode(SORT_MAP.INIT), onClick: setSortMode(SORT_MAP.INIT) },
						{ title: 'Сначала посещённые', active: isChooseSortMode(SORT_MAP.VISITED), onClick: setSortMode(SORT_MAP.VISITED) },
						{ title: 'Сначала непосещённые', active: isChooseSortMode(SORT_MAP.WANTED), onClick: setSortMode(SORT_MAP.WANTED) },
						{ title: 'По алфавиту', active: isChooseSortMode(SORT_MAP.ALPHABET), onClick: setSortMode(SORT_MAP.ALPHABET) },
					]} />
				<Switcher
					options={[
						{ title: 'Все', active: isChooseVisitedMode(VISITED_MAP.INIT), onClick: setVisitedMode(VISITED_MAP.INIT), },
						{ title: 'Только посещённые', active: isChooseVisitedMode(VISITED_MAP.VISITED), onClick: setVisitedMode(VISITED_MAP.VISITED), },
						{ title: 'Только непосещённые', active: isChooseVisitedMode(VISITED_MAP.WANTED), onClick: setVisitedMode(VISITED_MAP.WANTED), },
					]} />
			</FullWidthContainer>
			{isChooseVisualizator(VISUALIZATOR_MAP.TABLE) && <TourismTableGeo items={filtredRussiaCity} />}
			{isChooseVisualizator(VISUALIZATOR_MAP.MAP) && <TourismMapGeo items={filtredRussiaCity} />}
			{isChooseVisualizator(VISUALIZATOR_MAP.CARD) && <TourismCardGeo items={filtredRussiaCity} />}
		</Fragment>
	)
}
