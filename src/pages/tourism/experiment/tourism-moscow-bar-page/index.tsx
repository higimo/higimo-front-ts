import { BarPoiType, BarPoiRealTags } from 'api-types/tourism.types'
import { Coord } from 'utils.type'
import { FunctionComponent } from 'preact'
import { TagCategory } from 'types'

import { useApi } from 'hook/fetch/use-api'
import { useMemo } from 'preact/hooks'
import { useSmartTags } from 'hook/tags/use-smart-tags'

import { BarPoiList } from 'components/tourism/tourism-bar-poi-list'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Heading } from 'components/ui/heading/Heading'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TourismTagList } from 'components/tourism/tourism-tag-list'
import { TextContainer } from 'components/ui/text-container'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'

import { filterTagAnyStrategy } from 'utils/filter-tag-strategy/filter-tag-any-strategy'
import { getBarColor } from 'utils/tourism/get-bar-color'
import { getBarIcon } from 'utils/tourism/get-bar-icon'

import { API_ROUTE } from 'dic/route/API_ROUTE'
import { BAR_TAG_CATEGORY } from 'dic/tourism/BAR_TAG_CATEGORY'

import '../../tourism-style.css'
import '../yandex-map.css'

export const TourismMoscowBarPage: FunctionComponent = () => {
	const [ barPoiMoscow ] = useApi<BarPoiType[]>(API_ROUTE.moscowBars)

	const normalizedTagsBarPoiMoscow = useMemo(
		() => (barPoiMoscow.data || []).map((item: BarPoiType): BarPoiRealTags => ({
			...item,
			tags: item.tags.map((tagName, index) => ({
				id: index,
				title: tagName as string,
			}))
		})),
		[barPoiMoscow.data]
	)

	const tagGroups: TagCategory[] = useMemo(
		() => {
			return Object.entries(BAR_TAG_CATEGORY).map(([categoryName, tags], indexGroup) => ({
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
		[BAR_TAG_CATEGORY]
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
			return filterTagAnyStrategy(normalizedTagsBarPoiMoscow, { all: selectedTagTitles })
		},
		[normalizedTagsBarPoiMoscow, selectedTagTitles]
	)

	return (
		<Layout title="Московские бары" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism">Московские бары</Heading>
			</TextContainer>

			<LoadSuspense data={barPoiMoscow}>
				<EmptyData data={barPoiMoscow}>
					<div className="tourism-maps-moscow-bar">
						<TourismMapGeo<BarPoiRealTags, Coord>
							items={filteredData}
							zoom={12}
							center={[55.758772, 37.617933]}
							cluster={false}
							optionHandler={(point) => ({
								preset: getBarIcon(point.icon),
								iconColor: getBarColor(point.color),
							})}
						/>
						<TourismTagList
							groups={tagGroups}
							isSelected={isSelected}
							toggleTag={toggleTag}
							isCategoryAllSelected={isCategoryAllSelected}
							toggleAllInCategory={toggleAllInCategory}
						/>
						<BarPoiList
							barPoiList={filteredData || []}
						/>
					</div>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
