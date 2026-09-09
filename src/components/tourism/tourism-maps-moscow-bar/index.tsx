import { Coord } from 'utils.type'

import { BarPovRealTags, BarPovType, barTagsCategory } from 'components/tourism/data/bar-pov-moscow'
import { TagGroupedGallery } from 'components/tourism/tag-grouped-gallery'
import { TourismBarPointSnippet } from 'components/tourism/tourism-bar-point-snippet'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { TagCategory, useSmartTags } from 'hook/tags/use-smart-tags'
import useApi from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'

import { TourismMapGeo } from 'components/tourism/tourism-map-geo'

import { filterTagAnyStrategy } from 'utils/filter-tag-strategy/filterTagAnyStrategy'

import { API_ROUTE } from 'dic/API_ROUTE'

import '../yandex-map.css'

// TODO: [LIGHT] удалить useGroupTags, когда тут заработает
export const TourismMapsMoscowBar = () => {
	const [ barPovMoscow ] = useApi<BarPovType[]>(API_ROUTE.moscowBars)

	const isLoading = useLoadingState([barPovMoscow.status])
	const isListEmpty = useEmptyDataState(barPovMoscow.data)

	const normalizedTagsBarPovMoscow = useMemo(
		() => barPovMoscow.data.map((item: BarPovType): BarPovRealTags => ({
			...item,
			tags: item.tags.map((tagName, index) => ({
				id: index,
				title: tagName as string,
			}))
		})),
		[barPovMoscow.data]
	)

	const tagGroups: TagCategory[] = useMemo(
		() => {
			return Object.entries(barTagsCategory).map(([categoryName, tags], indexGroup) => ({
				group: {
					id: indexGroup,
					title: categoryName,
				},
				tags: tags.map((tagName, indexTag) => ({
					id: indexTag,
					title: tagName,
				}))
			}))
		},
		[barTagsCategory]
	)

	const {
		selectedTagTitles,
		toggleTag,
		isSelected,
		isCategoryAllSelected,
		toggleAllInCategory,
	} = useSmartTags({
		categories: tagGroups,
		mode: 'multiple',
		initialSelected: ['Любимый']
	})

	// TODO: [USE_TAGS] есть же хук useYearFilter(AND_GROUP_STRATEGY)
	const filteredData = useMemo(
		() => {
			console.log('INTO filteredData', normalizedTagsBarPovMoscow, selectedTagTitles)
			const res = filterTagAnyStrategy(normalizedTagsBarPovMoscow, { all: selectedTagTitles })
			console.log('HIGIMO', res)
			return res
		},
		[normalizedTagsBarPovMoscow, selectedTagTitles]
	);

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="tourism-maps-moscow-bar">
			<TourismMapGeo<BarPovRealTags, Coord>
				items={filteredData}
				zoom={12}
				center={[55.758772, 37.617933]}
				cluster={false}
			/>
			<TagGroupedGallery
				groups={tagGroups}
				isSelected={isSelected}
				toggleTag={toggleTag}
				isCategoryAllSelected={isCategoryAllSelected}
				toggleAllInCategory={toggleAllInCategory}
			/>
			{filteredData && (
				<div className="bar-pov__gallery">
					{filteredData.map((mapPoint: BarPovRealTags) => (
						<TourismBarPointSnippet key={mapPoint.id} {...mapPoint} />
					))}
				</div>
			)}
		</div>
	)
}
