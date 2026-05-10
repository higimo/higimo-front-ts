import { TagGroupedGallery } from 'components/tourism/tag-grouped-gallery'
import { TourismBarPointSnippet } from 'components/tourism/tourism-bar-point-snippet'
import { BarPovType, barTagsCategory } from 'components/tourism/tourism-maps-figure/data/bar-pov-moscow'
import { YandexMap } from 'components/tourism/yandex-map'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import useApi from 'hook/use-api'
import { useEmptyDataState } from 'hook/use-empty-data-state'
import { TAG_GROUP_ALL_DISABLE, TAG_GROUP_ALL_ENABLE, useGroupTags } from 'hook/use-group-tags'
import { useLoadingState } from 'hook/use-loading-state'
import { useMemo } from 'preact/hooks'

import { API_ROUTE } from 'dic/API_ROUTE'
import { filterTagAndGroupsStrategy } from 'utils/filter-tag-strategy/filterTagAndGroupsStrategy'

import 'components/tourism/yandex-map.css'

export const TourismMapsMoscowBar = () => {
	const [ barPovMoscow ] = useApi<BarPovType[]>(API_ROUTE.moscowBars)

	const isLoading = useLoadingState([barPovMoscow.status])
	const isListEmpty = useEmptyDataState(barPovMoscow.data)

	const tagGroups = useMemo(
		() => Object.entries(barTagsCategory)
			.reduce((acc, [categoryName, tags]) => ({
				...acc,
				[categoryName]: [
					TAG_GROUP_ALL_DISABLE,
					TAG_GROUP_ALL_ENABLE,
					// @ts-ignore
				].concat(barTagsCategory[categoryName])
			}),
			{}),
		[]
	)

	// TODO: [USE_TAGS] useTags теги интересно сделал
	const {
		selectedTags,
		toggleTag,
		selectAll,
		deselectAll,
		isAllSelected,
		isNoneSelected,
	} = useGroupTags(tagGroups);

	const filteredData = useMemo(
		// TODO: [USE_TAGS] useTags есть же DX с (хук есть) useYearFilter(AND_GROUP_STRATEGY)
		() => filterTagAndGroupsStrategy(barPovMoscow.data, selectedTags),
		[barPovMoscow.data, selectedTags]
	);

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="tourism-maps-moscow-bar">
			<YandexMap
				items={filteredData}
			/>
			<TagGroupedGallery
				groups={tagGroups}
				selectedTags={selectedTags}
				toggleTag={toggleTag}
				selectAll={selectAll}
				deselectAll={deselectAll}
				isAllSelected={isAllSelected}
				isNoneSelected={isNoneSelected}
			/>
			{filteredData && (
				<div className="bar-pov__gallery">
					{filteredData.map((mapPoint: BarPovType) => (
						<TourismBarPointSnippet key={mapPoint.title} {...mapPoint} />
					))}
				</div>
			)}
		</div>
	)
}
