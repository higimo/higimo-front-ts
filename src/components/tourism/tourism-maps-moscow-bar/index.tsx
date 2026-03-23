import { createRef, Fragment, FunctionComponent } from 'preact'

import { useEffect, useMemo, useState } from 'preact/hooks'
import { useWindowSize } from 'hook/use-window-size'
import { useTags } from 'hook/use-tags'

import { YMaps, Map } from 'react-yandex-maps'
import { TextContainer } from 'components/ui/text-container'
import { Tag } from 'components/ui/tag'
import { TourismBarPointSnippet } from 'components/tourism/tourism-bar-point-snippet'

// TODO: пиздец, подключаю ленивую подгрузку, а вместе с типами всё равно гружу остальное
import { BAR_COLOR_MAPPING, barColor, barIcon, BarPovType, barTagsCategory } from 'components/tourism/tourism-maps-figure/data/bar-pov-moscow'

import '../yandex-map.css'
import { TagGroupedGallery } from '../TagGroupedGallery'
import { TAG_GROUP_ALL_DISABLE, TAG_GROUP_ALL_ENABLE, useGroupTags } from 'hook/use-group-tags'
import { filterTagAndGroupsStrategy } from 'utils/filter-tag-strategy/filterTagAndGroupsStrategy'

// TODO: Надо это уже в хэлпер унести, чтоб мне с этим не париться
// TODO: А мне бы убрать, чтоб это не объект объектов был
const loadStateData = async (): Promise<{ barPovMoscow: BarPovType[] }> => {
	const { barPovMoscow } = await import('../tourism-maps-figure/data/common')
	return { barPovMoscow }
}

// TODO: типизировать функцию
// TODO: map — это текущая карта, может сразу геообжект передавать?
// TODO: yamaps — библиотека яндекса
const updateMap = (map, yamaps, filteredData) => {
	if (!map || !yamaps) {
		console.log('skip', !map, !yamaps, !filteredData.lengt)
		return null
	}

	map.geoObjects.removeAll()

	filteredData
		.forEach(mapPoint => {
			map.geoObjects.add(new yamaps.Placemark(
				mapPoint.coord,
				{
					hintContent: mapPoint.title,
				},
				{
					preset: barIcon(mapPoint.icon),
					iconColor: barColor(mapPoint.color),
					iconSize: [40, 40],
				}
			))
		})
}

export const TourismMapsMoscowBar = () => {
	const refMap = createRef() // TODO: Унести в компонент карты
	const [ yamaps, setYamaps ] = useState(null) // TODO: Унести в компонент карты
	const [ stateData, setStateData ] = useState<{ barPovMoscow: BarPovType[] }>({ barPovMoscow: [] })

	const { width, height } = useWindowSize() // TODO: Унести в компонент карты

	const handleMapLoad = ymaps => setYamaps(ymaps) // TODO: Унести в компонент карты

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

	useEffect(() => {
		updateMap(refMap.current, yamaps, filteredData)
	}, [refMap.current, yamaps, filteredData])

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
			{/* TODO: вынести в отдельный компонент, чтобы инкапсулировать width, height */}
			<div className="yandex-map">
				<YMaps query={{ lang: 'ru_RU' }}>
					<Map
						instanceRef={refMap}
						onLoad={handleMapLoad}
						width={Math.min(width * .85, 1200)}
						height={Math.min(height * .6, 750)}
						defaultState={{
							zoom: 11,
							center: [55.73, 37.75],
						}}
						modules={[
							'Polygon',
							'ObjectManager',
							'GeoObject',
							'Placemark',
							'geoObject.addon.hint',
							'ObjectManager', 'objectManager.addon.objectsBalloon'
						]}
					>
					</Map>
				</YMaps>
			</div>
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
