import { createRef, Fragment } from 'preact'

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

// TODO: Надо это уже в хэлпер унести, чтоб мне с этим не париться
// TODO: А мне бы убрать, чтоб это не объект объектов был
const loadStateData = async (): Promise<{ barPovMoscow: BarPovType[] }> => {
	const { barPovMoscow } = await import('../tourism-maps-figure/data/common')
	return { barPovMoscow }
}

const barPovFilter = (selectedColor, selectedTags) => (mapPoint: BarPovType) => {
	if (!selectedColor.includes(mapPoint.color)) {
		return false
	}
	// TODO: надо вынести в отдельную утилиту включение одного массива в другой
	const mapPointSets = new Set(mapPoint.tags)
	if (!selectedTags.some(item => mapPointSets.has(item))) {
		return false
	}
	return true
}

// TODO: типизировать функцию
// TODO: map — это текущая карта, может сразу геообжект передавать?
// TODO: yamaps — библиотека яндекса
const updateMap = (map, yamaps, stateData: { barPovMoscow: BarPovType[] }, selectedColor, selectedTags) => {
	if (!map || !yamaps || !stateData.barPovMoscow) {
		return null
	}

	map.geoObjects.removeAll()

	stateData.barPovMoscow
		.filter(barPovFilter(selectedColor, selectedTags))
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
	const [ stateData, setStateData ] = useState<{ barPovMoscow: BarPovType[] }>({ barPovMoscow: [] })
	const { width, height } = useWindowSize()
	const [ selectedColor, handleColorClick ] = useTags<string>([])
	const [ selectedTags, handleTagsClick ] = useTags<string>([])

	const handleMapLoad = ymaps => setYamaps(ymaps)

	const allColors = useMemo(() => Object.keys(BAR_COLOR_MAPPING), [])
	const allTags = useMemo(() => Object.keys(barTagsCategory)
		.reduce((acc, item) => acc.concat(Object.keys(barTagsCategory[item])), [])
	, [])



	useEffect(() => {
		updateMap(refMap.current, yamaps, stateData, selectedColor, selectedTags)
	}, [refMap.current, yamaps, stateData, selectedColor, selectedTags])

	useEffect(() => {
		loadStateData().then(setStateData)
	}, [])

	useEffect(() => {
		handleColorClick(allColors)()
		handleTagsClick(allTags)()
	}, [])

	return (
		<Fragment>
			<TextContainer>
				{/* TODO: компонент показа галереи тегов */}
				<div>
					Отношение:{' '}
					<Tag active={!selectedColor.length} onClick={handleColorClick([])}>Сбросить</Tag>{' '}
					<Tag active={selectedColor.length === allColors.length} onClick={handleColorClick(allColors)}>Выбрать всё</Tag>{' '}
					{Object.keys(BAR_COLOR_MAPPING).map(colorName => (
						<Tag active={selectedColor.includes(colorName)} onClick={handleColorClick([colorName])}>{colorName}</Tag>
					))}
					<hr />
					Теги:{' '}
					<Tag active={!selectedTags.length} onClick={handleTagsClick([])}>Сбросить</Tag>{' '}
					<Tag active={selectedTags.length === allTags.length} onClick={handleTagsClick(allTags)}>Выбрать всё</Tag>{' '}
					{Object.keys(barTagsCategory).map(item => (
						<div>
							{item}{' '}
							{Object.keys(barTagsCategory[item]).map(subitem => (
								<Tag active={selectedTags.includes(subitem)} onClick={handleTagsClick([subitem])}>{subitem}</Tag>
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
			{stateData.barPovMoscow && (
				<div className="bar-pov__gallery">
					{stateData.barPovMoscow.filter(barPovFilter(selectedColor, selectedTags)).map((mapPoint: BarPovType) => (
						<TourismBarPointSnippet {...mapPoint} />
					))}
				</div>
			)}
		</Fragment>
	)
}
