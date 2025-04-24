import { createRef, Fragment } from 'preact'

import { YMaps, Map } from 'react-yandex-maps'
import { TextContainer } from '../../ui/text-container'
import { Tag } from '../../ui/tag'
import { useEffect, useState } from 'preact/hooks'

import '../yandex-map.css'
import { useWindowSize } from '../../../hook/use-window-size'

const MAP_MODE = {
	INIT: 'INIT',
	2024: '2024',
	2021: '2021',
	'2021vs2024': '2021vs2024',
}

const loadStateData = async () => {
	// TODO: всё же вернуть moscowPovPoints
	const { stateYear2021, stateYear2024 } = await import('./data/common')
	return { stateYear2021, stateYear2024 }
}

const updateMap = (map, yamaps, mode, stateData) => {
	if (!map || !yamaps || !stateData.stateYear2021 || !stateData.stateYear2024 || mode === MAP_MODE.INIT) {
		return null;
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
}

export const TourismMapsFigure = () => {
	const refMap = createRef()
	const [ mode, setMode ] = useState(MAP_MODE.INIT)
	const [ yamaps, setYamaps ] = useState(null)
	const [stateData, setStateData] = useState(null)
	const { width } = useWindowSize();

	const handleMapLoad = ymaps => {
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
				<Tag onClick={() => setMode(MAP_MODE[2024])}>2024 год</Tag>
				<Tag onClick={() => setMode(MAP_MODE[2021])}>2021 год</Tag>
				<Tag onClick={() => setMode(MAP_MODE['2021vs2024'])}>Сравнение 2021 и 2024</Tag>
			</TextContainer>
			<div className="yandex-map">
				<YMaps query={{ lang: 'ru_RU' }}>
					<Map
						// @ts-ignore
						instanceRef={refMap}
						onLoad={handleMapLoad}
						width={Math.min(width * .85, 1200)}
						height='500px'
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
