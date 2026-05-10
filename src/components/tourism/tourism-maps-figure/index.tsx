import { HigimoMapPoint, YaMapPolygon } from 'components/tourism/tourism-maps-figure/data/types'
import { createRef, Fragment } from 'preact'
import { ValueOf } from 'utils.type'

import { useWindowSize } from 'hook/use-window-size'
import { useEffect, useState } from 'preact/hooks'

import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'
import { Map, YMaps } from 'react-yandex-maps'

import 'components/tourism/yandex-map.css'

const MAP_MODE = {
	INIT: 'INIT',
	2024: '2024',
	2021: '2021',
	'2021vs2024': '2021vs2024',
	'POV': 'POV',
}

const loadStateData = async (): Promise<MoscowWalkaroundStateDataType> => {
	const { stateYear2021, stateYear2024, moscowPovPoints } = await import('./data/common')
	return { stateYear2021, stateYear2024, moscowPovPoints }
}

type UpdateMapPropsType = (map: any, yamaps: any, mode: ValueOf<typeof MAP_MODE>, stateData: MoscowWalkaroundStateDataType|null) => null|undefined
const updateMap: UpdateMapPropsType = (map, yamaps, mode, stateData) => {
	if (!map || !yamaps || !stateData || !stateData.stateYear2021 || !stateData.stateYear2024 || mode === MAP_MODE.INIT) {
		return null
	}

	map.geoObjects.removeAll()

	if (mode === MAP_MODE['2021vs2024']) {
		stateData.stateYear2024.forEach(stateItem => {
			map.geoObjects.add(new yamaps.GeoObject({
				geometry: stateItem,
			}, {
				fillColor: '#748865',
				strokeColor: '#FFB681',
				opacity: .6,
				strokeWidth: .7,
			}))
		})
		stateData.stateYear2021.forEach(stateItem => {
			map.geoObjects.add(new yamaps.GeoObject({
				geometry: stateItem,
			}, {
				fillColor: '#748865',
				strokeColor: '#FFB681',
				opacity: .6,
				strokeWidth: .7,
			}))
		})
	}

	if (mode === MAP_MODE[2024]) {
		stateData.stateYear2024.forEach(stateItem => {
			map.geoObjects.add(new yamaps.GeoObject({
				geometry: stateItem,
			}, {
				fillColor: '#748865',
				strokeColor: '#FFB681',
				opacity: .6,
				strokeWidth: .7,
			}))
		})
	}

	if (mode === MAP_MODE[2021]) {
		stateData.stateYear2021.forEach(stateItem => {
			map.geoObjects.add(new yamaps.GeoObject({
				geometry: stateItem,
			}, {
				fillColor: '#748865',
				strokeColor: '#FFB681',
				opacity: .6,
				strokeWidth: .7,
			}))
		})
	}

	if (mode === MAP_MODE.POV) {
		stateData.moscowPovPoints.forEach(stateItem => {
			map.geoObjects.add(new yamaps.Placemark(
				stateItem.coord,
				{
					hintContent: stateItem.title,
				},
			))
		})
	}
}

type MoscowWalkaroundStateDataType = {
	stateYear2021: YaMapPolygon[]
	stateYear2024: YaMapPolygon[]
	moscowPovPoints: HigimoMapPoint[]
}

export const TourismMoscowWalkaround = () => {
	const refMap = createRef()
	const [ mode, setMode ] = useState<ValueOf<typeof MAP_MODE>>(MAP_MODE.INIT)
	const [ yamaps, setYamaps ] = useState(null)
	const [stateData, setStateData] = useState<MoscowWalkaroundStateDataType|null>(null)
	const { width } = useWindowSize()

	const handleMapLoad = (ymaps: any) => {
		if (mode === MAP_MODE.INIT) {
			setMode(MAP_MODE[2024])
		}
		setYamaps(ymaps)
	}

	useEffect(() => {
		updateMap(refMap.current, yamaps, mode, stateData)
	}, [refMap.current, yamaps, mode, stateData])

	useEffect(() => {
		loadStateData().then(setStateData)
	}, [])

	return (
		<Fragment>
			<TextContainer>
				<Tag active={mode === MAP_MODE[2024]} onClick={() => setMode(MAP_MODE[2024])}>2024 год</Tag>
				<Tag active={mode === MAP_MODE[2021]} onClick={() => setMode(MAP_MODE[2021])}>2021 год</Tag>
				<Tag active={mode === MAP_MODE['2021vs2024']} onClick={() => setMode(MAP_MODE['2021vs2024'])}>Сравнение 2021 и 2024</Tag>
				<Tag active={mode === MAP_MODE.POV} onClick={() => setMode(MAP_MODE.POV)}>Точки интереса</Tag>
			</TextContainer>
			<div className="yandex-map">
				<YMaps query={{ lang: 'ru_RU' }}>
					<Map
						// @ts-ignore
						instanceRef={refMap}
						onLoad={handleMapLoad}
						width={Math.min(width * .85, 1200)}
						height='900px'
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
		</Fragment>
	)
}
