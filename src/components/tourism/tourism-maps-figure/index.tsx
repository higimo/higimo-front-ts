import { createRef, Fragment } from 'preact'
import { HigimoMapPoint, YaMapPolygon } from 'components/tourism/data/types'
import { ValueOf } from 'utils.type'

import { useEffect, useState } from 'preact/hooks'
import { useJsonApi } from 'hook/use-json-api'
import { useWindowSize } from 'hook/use-window-size'

import { Loading } from 'components/ui/loading'
import { Map, YMaps } from 'react-yandex-maps'
import { Tag } from 'components/ui/tag'
import { TextContainer } from 'components/ui/text-container'

import '../yandex-map.css'

type MoscowWalkaroundStateDataType = {
	stateYear2021: YaMapPolygon[]
	stateYear2024: YaMapPolygon[]
	moscowPovPoints: HigimoMapPoint[]
}

type LoadingState = { isLoading: true, data: null } | { isLoading: false, data: MoscowWalkaroundStateDataType }

const MAP_MODE = {
	INIT: 'INIT',
	2024: '2024',
	2021: '2021',
	'2021vs2024': '2021vs2024',
	'POV': 'POV',
} as const

const useLoadMoscowWolkaround = (): LoadingState => {
	const [ state, setState ] = useState<LoadingState>({ isLoading: true, data: null })

	const moscowPovPoints = useJsonApi<HigimoMapPoint[]>('/json/tourism/moscow-pov-points.json')
	const stateYear2021 = useJsonApi<YaMapPolygon[]>('/json/tourism/walk-moscow-2021.json')
	const stateYear2024 = useJsonApi<YaMapPolygon[]>('/json/tourism/walk-moscow-2024.json')

	useEffect(() => {
		const isLoading = moscowPovPoints === null || stateYear2021 === null || stateYear2024 === null
		if (isLoading) {
			if (!state.isLoading) {
				setState({
					isLoading: true,
					data: null
				})
			}
			return
		}
		setState({
			isLoading: false,
			data: {
				moscowPovPoints,
				stateYear2021,
				stateYear2024,
			}
		})
	}, [moscowPovPoints, stateYear2021, stateYear2024])

	return state
}

type UpdateMapPropsType = (map: any, yamaps: any, mode: ValueOf<typeof MAP_MODE>, stateData: MoscowWalkaroundStateDataType|null) => null|undefined
const updateMap: UpdateMapPropsType = (map, yamaps, mode, stateData) => {
	if (!map || !yamaps || !stateData || !stateData.stateYear2021 || !stateData.stateYear2024 || mode === MAP_MODE.INIT) {
		return
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

export const TourismMoscowWalkaround = () => {
	const refMap = createRef()
	// TODO: [LIGHT] заменить на
	// const [isMode, setMode] = useSwitcher<typeof MAP_MODE>(MAP_MODE.INIT)
	const [ mode, setMode ] = useState<ValueOf<typeof MAP_MODE>>(MAP_MODE.INIT)
	const [ yamaps, setYamaps ] = useState(null)
	const { width } = useWindowSize()
	const { isLoading, data: stateData } = useLoadMoscowWolkaround()

	const handleMapLoad = (ymaps: any) => {
		if (mode === MAP_MODE.INIT) {
			setMode(MAP_MODE[2024])
		}
		setYamaps(ymaps)
	}

	useEffect(() => {
		if (!isLoading) {
			updateMap(refMap.current, yamaps, mode, stateData)
		}
	}, [refMap.current, yamaps, mode, stateData, isLoading])

	if (isLoading) {
		return <Loading />
	}


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
