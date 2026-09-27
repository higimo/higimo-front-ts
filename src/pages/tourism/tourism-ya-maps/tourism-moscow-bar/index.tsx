import { BarPovType, BarPovRealTags } from 'api-types/tourism.types'
import { Coord } from 'utils.type'
import { FunctionComponent } from 'preact'
import { TagCategory } from 'types'
import { TextContainer } from 'components/ui/text-container'

import { useApi } from 'hook/fetch/use-api'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMemo } from 'preact/hooks'
import { useSmartTags } from 'hook/tags/use-smart-tags'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading/Loading'
import { NotFoundData } from 'components/ui/not-found-data/NotFoundData'
import { TagGroupedGallery } from 'components/tourism/tag-grouped-gallery'
import { TourismBarPointSnippet } from 'components/tourism/tourism-bar-point-snippet'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'

import { filterTagAnyStrategy } from 'utils/filter-tag-strategy/filter-tag-any-strategy'

import { API_ROUTE } from 'dic/API_ROUTE'
import { BAR_TAGS_CATEGORY } from 'dic/tourism/BAR_TAGS_CATEGORY'

import '../../tourism-style.css'
import '../yandex-map.css'

export const TourismMoscowBarPage: FunctionComponent = () => {
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
			return Object.entries(BAR_TAGS_CATEGORY).map(([categoryName, tags], indexGroup) => ({
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
		[BAR_TAGS_CATEGORY]
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
			return filterTagAnyStrategy(normalizedTagsBarPovMoscow, { all: selectedTagTitles })
		},
		[normalizedTagsBarPovMoscow, selectedTagTitles]
	)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Московские бары</TourismHeader>
			</TextContainer>

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
		</div>
	)
}
