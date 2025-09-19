import { createRef, Fragment } from 'preact'

import { YMaps, Map } from 'react-yandex-maps'
import { TextContainer } from 'components/ui/text-container'
import { Tag } from 'components/ui/tag'
import { useEffect, useState } from 'preact/hooks'

import '../yandex-map.css'
import { useWindowSize } from 'hook/use-window-size'
import { BAR_COLOR_MAPPING, barColor, barIcon, BarPovType, barTagsCategory } from '../tourism-maps-figure/data/bar-pov-moscow'
import { TourismBarPointSnippet } from '../tourism-bar-point-snippet'

// https://yandex.ru/dev/jsapi-v2-1/doc/ru/v2-1/ref/reference/option.presetStorage
// https://yandex.ru/dev/maps/jsbox/2.1/polygon/
// https://yandex.ru/dev/maps/archive/doc/jsapi/2-0/ru/ref/reference/GeoObject
// https://yandex.ru/map-constructor/

const MAP_MODE = {
	INIT: 'INIT',
	2024: '2024',
	2021: '2021',
	'2021vs2024': '2021vs2024',
}

const loadStateData = async (): Promise<{ barPovMoscow: BarPovType[] }> => {
	const { barPovMoscow } = await import('../tourism-maps-figure/data/common')
	return { barPovMoscow }
}

const barPovFilter = (filter) => (mapPoint: BarPovType) => {
	if (!!filter.color && BAR_COLOR_MAPPING[filter.color] !== mapPoint.color) {
		return false
	}
	if (!!filter.tag && !mapPoint.tags.includes(filter.tag)) {
		return false
	}
	return true
}

const updateMap = (map, yamaps, mode, stateData: { barPovMoscow: BarPovType[] }, filter) => {
	if (!map || !yamaps || !stateData.barPovMoscow || mode === MAP_MODE.INIT) {
		return null;
	}

	map.geoObjects.removeAll()

	stateData.barPovMoscow
		.filter(barPovFilter(filter))
		.forEach(mapPoint => {
			map.geoObjects.add(new yamaps.Placemark(
				mapPoint.coord,
				{
					hintContent: mapPoint.title,
				},
				{
					preset: barIcon(mapPoint.icon),
					iconColor: barColor(mapPoint.color),
					iconSize: [15, 15],
				}
			))
		})
}

export const TourismMapsMoscowBar = () => {
	const refMap = createRef()
	const [ mode, setMode ] = useState(MAP_MODE.INIT)
	const [ yamaps, setYamaps ] = useState(null)
	const [stateData, setStateData] = useState<{ barPovMoscow: BarPovType[] }>({ barPovMoscow: [] })
	const { width, height } = useWindowSize();
	const [ filter, setFilter ] = useState({
		color: null,
		tag: null,
	})

	const handleMapLoad = ymaps => {
		if (mode === MAP_MODE.INIT) {
			setMode(MAP_MODE[2024])
		}
		setYamaps(ymaps)
	}

	useEffect(() => {
		updateMap(refMap.current, yamaps, mode, stateData, filter)
	}, [refMap.current, yamaps, mode, stateData, filter])

	useEffect(() => {
		loadStateData().then(setStateData)
	}, [])

	const handleColorTagClick = (colorName) => () => {
		setFilter(prev => ({ ...prev, color: colorName }))
	}

	const handleCategoryTagClick = (tagCategoryName) => () => {
		setFilter(prev => ({ ...prev, tag: tagCategoryName }))
	}

	return (
		<Fragment>
			<TextContainer>
				<div>
					Отношение: <Tag active={filter.color === null} onClick={handleColorTagClick(null)}>Сбросить</Tag>{' '}
					{Object.keys(BAR_COLOR_MAPPING).map(colorName => (
						<Tag active={filter.color === colorName} onClick={handleColorTagClick(colorName)}>{colorName}</Tag>
					))}
					<hr />
					Теги: <Tag active={filter.tag === null} onClick={handleCategoryTagClick(null)}>Сбросить</Tag>{' '}
					{Object.keys(barTagsCategory).map(item => (
						<div>
							{item}{' '}
							{Object.keys(barTagsCategory[item]).map(subitem => (
								<Tag active={filter.tag === subitem} onClick={handleCategoryTagClick(subitem)}>{subitem}</Tag>
							))}
						</div>
					))}
				</div>
			</TextContainer>
			<div className="yandex-map">
				<YMaps query={{ lang: 'ru_RU' }}>
					<Map
						// @ts-ignore
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
			{stateData.barPovMoscow && (
				<div className="bar-pov__gallery">
					{stateData.barPovMoscow.filter(barPovFilter(filter)).map((mapPoint: BarPovType) => (
						<TourismBarPointSnippet {...mapPoint} />
					))}
				</div>
			)}
		</Fragment>
	)
}
