import { Fragment, FunctionComponent, VNode } from 'preact'
import { SimpleMapPoint, YaMapPolygon } from 'api-types/tourism.types'
import { ValueOf } from 'utils.type'

import { useSwitcher } from 'hook/use-switcher'
import { useWindowSize } from 'hook/browser/use-window-size'

import { GeoObject, Map, Placemark, YMaps } from 'react-yandex-maps'
import { Switcher } from 'components/ui/switcher'
import { TextContainer } from 'components/ui/text-container'

import { GEO_OBJECT_OPTIONS } from 'config/GEO-OBJECT-OPTIONS'
import { TORUSM_MAP_MODE } from 'dic/tourism/TORUSM_MAP_MODE'

type TourismMoscowWalkaroundPropsType = {
	moscowPoiPoints: SimpleMapPoint[] | null
	stateYear2021: YaMapPolygon[] | null
	stateYear2024: YaMapPolygon[] | null
}

export const TourismMoscowWalkaround: FunctionComponent<TourismMoscowWalkaroundPropsType> = ({
	moscowPoiPoints,
	stateYear2021,
	stateYear2024,
}) => {
	if (!moscowPoiPoints || !stateYear2021 || !stateYear2024) {
		return null
	}
	const [ isMode, setMode ] = useSwitcher<ValueOf<typeof TORUSM_MAP_MODE>>(TORUSM_MAP_MODE['2024'])
	const { width } = useWindowSize()

	const renderByMode = () => {
		if (isMode(TORUSM_MAP_MODE['2021'])) {
			return stateYear2021.map((item, key) => (
				<GeoObject key={key} geometry={item} options={GEO_OBJECT_OPTIONS} />
			))
		}
		if (isMode(TORUSM_MAP_MODE['2024'])) {
			return stateYear2024.map((item, key) => (
				<GeoObject key={key} geometry={item} options={GEO_OBJECT_OPTIONS} />
			))
		}
		if (isMode(TORUSM_MAP_MODE['21vs24'])) {
			return ([] as VNode[])
				.concat(stateYear2021.map((item, key) => (
					<GeoObject key={key} geometry={item} options={GEO_OBJECT_OPTIONS} />
				)))
				.concat(stateYear2024.map((item, key) => (
					<GeoObject key={key} geometry={item} options={GEO_OBJECT_OPTIONS} />
				)))
		}
		if (isMode(TORUSM_MAP_MODE['POI'])) {
			return moscowPoiPoints.map((poi, key) => (
				<Placemark key={key} geometry={poi.coord} properties={{ hintContent: poi.title }} />
			))
		}
		return null
	}

	return (
		<Fragment>
			<TextContainer>
				<Switcher
					options={[
						{ active: isMode(TORUSM_MAP_MODE[2024]), onClick: setMode(TORUSM_MAP_MODE[2024]), title: '2024 год'},
						{ active: isMode(TORUSM_MAP_MODE[2021]), onClick: setMode(TORUSM_MAP_MODE[2021]), title: '2021 год'},
						{ active: isMode(TORUSM_MAP_MODE['21vs24']), onClick: setMode(TORUSM_MAP_MODE['21vs24']), title: 'Сравнение 2021 и 2024'},
						{ active: isMode(TORUSM_MAP_MODE['POI']), onClick: setMode(TORUSM_MAP_MODE['POI']), title: 'Точки интереса'},
					]}
				/>
			</TextContainer>
			<div className="yandex-map">
				<YMaps query={{ lang: 'ru_RU', apikey: import.meta.env.VITE_YA_MAP_KEY }}>
					<Map
						width={Math.min(width * .85, 1200)}
						height='900px'
						defaultState={{
							zoom: 11,
							center: [55.73, 37.75],
						}}
						modules={['Placemark', 'geoObject.addon.hint']}
					>
						{renderByMode()}
					</Map>
				</YMaps>
			</div>
		</Fragment>
	)
}
