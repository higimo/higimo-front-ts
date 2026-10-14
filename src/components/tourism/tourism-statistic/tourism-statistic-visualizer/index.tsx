import { Fragment, FunctionComponent } from 'preact'
import { PoiType } from 'api-types/tourism.types'
import { ValueOf } from 'utils.type'

import { useSmartTags } from 'hook/tags/use-smart-tags'
import { useSwitcher } from 'hook/use-switcher'
import { useMemo } from 'preact/hooks'

import { FullWidthContainer } from 'components/ui/full-width-container'
import { Switcher } from 'components/ui/switcher'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'
import { TourismCardGeo } from 'components/tourism/tourism-card-geo'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'
import { TourismTableGeo } from 'components/tourism/tourism-table-geo'

import { handleFilterMapPoint, handleSort } from 'utils/tourism/handle-filter-map-point'

import { TOURISM_VISITED_TAG_CATEGORY } from 'dic/tourism/TOURISM_VISITED_TAG_CATEGORY'
import { TORUSM_SORT_MAP } from 'dic/tourism/TORUSM_SORT_MAP'
import { VISITED_MAP } from 'dic/tourism/VISITED_MAP'
import { VISUALIZATOR_MAP } from 'dic/tourism/VISUALIZATOR_MAP'

type TourismStatisticVisualizerPropsType = {
	poi: PoiType[]
}

export const TourismStatisticVisualizer: FunctionComponent<TourismStatisticVisualizerPropsType> = ({
	poi
}) => {
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
		() => poi
			.filter(handleFilterMapPoint({
				selectedIds: selectedTagTitles,
				isChooseVisitedMode,
			}))
			.sort(handleSort(isChooseSortMode)),
		[poi, selectedTagTitles, isChooseVisitedMode, isChooseSortMode]
	)

	return (
		<Fragment>
			<TextContainer>
				{TOURISM_VISITED_TAG_CATEGORY[0]?.tags.map((tag) => (
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
			{isChooseVisualizator(VISUALIZATOR_MAP.MAP)   && (
				<TourismMapGeo
					items={filtredRussiaCity}
					propertyHandler={(point) => ({
						hintContent: point.title,
						iconCaption: point.title,
						balloonContentHeader: point.title,
						balloonContentBody: [
							'type' in point && point.type,
							[
								'okrug' in point && point.okrug,
								'region' in point && point.region,
								'country' in point ? point.country : 'Россия',
							].filter(Boolean).join(', '),
							'description' in point && point.description,
						].filter(Boolean).join('<br />'),
						balloonContentFooter: [
							'visited' in point && point.visited ? 'Посетил' : 'Не посетил',
							'population' in point ? `Население: ${point.population} К` : false,
							point.coord.join(', '),
						].filter(Boolean).join(' | '),
					})}
					optionHandler={(point) => ({
						iconColor: 'visited' in point && point.visited ? '#344d3d' : '#b3b3b3',
						iconSize: [15, 15],
					})}
				/>
			)}
			{isChooseVisualizator(VISUALIZATOR_MAP.CARD)  && (
				<TourismCardGeo items={filtredRussiaCity} />
			)}
		</Fragment>
	)
}
