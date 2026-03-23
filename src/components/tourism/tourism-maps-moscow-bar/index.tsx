import { Fragment } from 'preact'

import { useEffect, useMemo, useState } from 'preact/hooks'

import { TourismBarPointSnippet } from 'components/tourism/tourism-bar-point-snippet'

// TODO: пиздец, подключаю ленивую подгрузку, а вместе с типами всё равно гружу остальное
import { BarPovType, barTagsCategory } from 'components/tourism/tourism-maps-figure/data/bar-pov-moscow'

import '../yandex-map.css'
import { TagGroupedGallery } from '../TagGroupedGallery'
import { TAG_GROUP_ALL_DISABLE, TAG_GROUP_ALL_ENABLE, useGroupTags } from 'hook/use-group-tags'
import { filterTagAndGroupsStrategy } from 'utils/filter-tag-strategy/filterTagAndGroupsStrategy'
import { YandexMap } from '../YandexMap'

// TODO: Надо это уже в хэлпер унести, чтоб мне с этим не париться
// TODO: А мне бы убрать, чтоб это не объект объектов был
const loadStateData = async (): Promise<{ barPovMoscow: BarPovType[] }> => {
	const { barPovMoscow } = await import('../tourism-maps-figure/data/common')
	return { barPovMoscow }
}

export const TourismMapsMoscowBar = () => {
	const [ stateData, setStateData ] = useState<{ barPovMoscow: BarPovType[] }>({ barPovMoscow: [] })

	const tagGroups = useMemo(() => {
		return Object.keys(barTagsCategory).reduce((acc, categoryName) => {
			return {
				...acc,
				[categoryName]: [
					TAG_GROUP_ALL_DISABLE,
					TAG_GROUP_ALL_ENABLE,
					...Object.keys(barTagsCategory[categoryName])
				]
			}
		}, {})
	}, [])

	const {
		selectedTags,
		toggleTag,
		selectAll,
		deselectAll,
		isAllSelected,
		isNoneSelected,
	} = useGroupTags(tagGroups);

	const filteredData = useMemo(
		() => filterTagAndGroupsStrategy(stateData.barPovMoscow, selectedTags),
		[stateData.barPovMoscow, selectedTags]
	);

	useEffect(() => {
		loadStateData().then(setStateData)
	}, [])

	return (
		<Fragment>
			<TagGroupedGallery
				groups={tagGroups}
				selectedTags={selectedTags}
				toggleTag={toggleTag}
				selectAll={selectAll}
				deselectAll={deselectAll}
				isAllSelected={isAllSelected}
				isNoneSelected={isNoneSelected}
			/>
			<YandexMap
				items={filteredData}
			/>
			{filteredData && (
				<div className="bar-pov__gallery">
					{filteredData.map((mapPoint: BarPovType) => (
						<TourismBarPointSnippet key={mapPoint.title} {...mapPoint} />
					))}
				</div>
			)}
		</Fragment>
	)
}
