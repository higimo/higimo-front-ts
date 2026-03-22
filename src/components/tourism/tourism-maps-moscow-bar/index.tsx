import { createRef, Fragment } from 'preact'

import { useEffect, useState } from 'preact/hooks'
import { useWindowSize } from 'hook/use-window-size'

import { YMaps, Map } from 'react-yandex-maps'
import { TextContainer } from 'components/ui/text-container'
import { Tag } from 'components/ui/tag'
import { TourismBarPointSnippet } from 'components/tourism/tourism-bar-point-snippet'

import { BAR_COLOR_MAPPING, barColor, barIcon, BarPovType, barTagsCategory } from 'components/tourism/tourism-maps-figure/data/bar-pov-moscow'

import '../yandex-map.css'

// https://yandex.ru/dev/jsapi-v2-1/doc/ru/v2-1/ref/reference/option.presetStorage
// https://yandex.ru/dev/maps/jsbox/2.1/polygon/
// https://yandex.ru/dev/maps/archive/doc/jsapi/2-0/ru/ref/reference/GeoObject
// https://yandex.ru/map-constructor/

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

const updateMap = (map, yamaps, stateData: { barPovMoscow: BarPovType[] }, filter) => {
	if (!map || !yamaps || !stateData.barPovMoscow) {
		return null
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
	const [ yamaps, setYamaps ] = useState(null)
	const [stateData, setStateData] = useState<{ barPovMoscow: BarPovType[] }>({ barPovMoscow: [] })
	const { width, height } = useWindowSize()
	// TODO: использовать хук фильтра тегов
	const [ filter, setFilter ] = useState({
		color: null,
		tag: null,
	})

	const handleMapLoad = ymaps => {
		setYamaps(ymaps)
	}

	useEffect(() => {
		updateMap(refMap.current, yamaps, stateData, filter)
	}, [refMap.current, yamaps, stateData, filter])

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
				{/* TODO: компонент показа галереи тегов */}
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
			{/* TODO: по клику на карточку бы фильтровать только его на карте */}
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
