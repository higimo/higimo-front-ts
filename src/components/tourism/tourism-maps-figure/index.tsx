import { Fragment, FunctionComponent, VNode } from 'preact'
import { HigimoMapPoint, YaMapPolygon } from 'api-types/tourism.types'
import { ValueOf } from 'utils.type'

import { useSwitcher } from 'hook/use-switcher'
import { useWindowSize } from 'hook/browser/use-window-size'

import { GeoObject, Map, Placemark, YMaps } from 'react-yandex-maps'
import { Switcher } from 'components/ui/switcher'
import { TextContainer } from 'components/ui/text-container'

import { GEO_OBJECT_OPTIONS } from 'components/tourism/tourism-maps-figure/GEO_OBJECT_OPTIONS'
import { MAP_MODE } from 'components/tourism/tourism-maps-figure/MAP_MODE'

type TourismMoscowWalkaroundPropsType = {
	moscowPovPoints: HigimoMapPoint[]
	stateYear2021: YaMapPolygon[]
	stateYear2024: YaMapPolygon[]
}

export const TourismMoscowWalkaround: FunctionComponent<TourismMoscowWalkaroundPropsType> = ({
	moscowPovPoints,
	stateYear2021,
	stateYear2024,
}) => {
	const [ isMode, setMode ] = useSwitcher<ValueOf<typeof MAP_MODE>>(MAP_MODE['2024'])
	const { width } = useWindowSize()

	const renderByMode = () => {
		if (isMode(MAP_MODE['2021'])) {
			return stateYear2021.map((item: any) => (
				<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
			))
		}
		if (isMode(MAP_MODE['2024'])) {
			return stateYear2024.map((item: any) => (
				<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
			))
		}
		if (isMode(MAP_MODE['21vs24'])) {
			return ([] as VNode[])
				.concat(stateYear2021.map((item: any) => (
					<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
				)))
				.concat(stateYear2024.map((item: any) => (
					<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
				)))
		}
		if (isMode(MAP_MODE['POV'])) {
			return moscowPovPoints.map((pov) => (
				<Placemark geometry={pov.coord} properties={{ hintContent: pov.title }} />
			))
		}
		return null
	}

	return (
		<Fragment>
			<TextContainer>
				<Switcher
					options={[
						{ active: isMode(MAP_MODE[2024]), onClick: setMode(MAP_MODE[2024]), title: '2024 год'},
						{ active: isMode(MAP_MODE[2021]), onClick: setMode(MAP_MODE[2021]), title: '2021 год'},
						{ active: isMode(MAP_MODE['21vs24']), onClick: setMode(MAP_MODE['21vs24']), title: 'Сравнение 2021 и 2024'},
						{ active: isMode(MAP_MODE['POV']), onClick: setMode(MAP_MODE['POV']), title: 'Точки интереса'},
					]}
				/>
			</TextContainer>
			<div className="yandex-map">
				{/* TODO: [LIGHT] вынести ключ в .env */}
				<YMaps query={{ lang: 'ru_RU', apikey: '36482037-351d-458f-87ce-c2bf4a1e508b' }}>
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
