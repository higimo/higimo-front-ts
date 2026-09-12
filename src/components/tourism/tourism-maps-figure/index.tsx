import { Fragment, FunctionComponent, VNode } from 'preact'
import { ValueOf } from 'utils.type'

import { MoscowWalkaroundStateDataType } from './useLoadMoscowWalkaround'
import { useSwitcher } from 'hook/use-switcher'
import { useWindowSize } from 'hook/browser/use-window-size'

import { GeoObject, Map, Placemark, YMaps } from 'react-yandex-maps'
import { Switcher } from 'components/ui/switcher'
import { TextContainer } from 'components/ui/text-container'

import { MAP_MODE } from './MAP_MODE'
import { GEO_OBJECT_OPTIONS } from './GEO_OBJECT_OPTIONS'

type TourismMoscowWalkaroundPropsType = {
	stateData: MoscowWalkaroundStateDataType
}

export const TourismMoscowWalkaround: FunctionComponent<TourismMoscowWalkaroundPropsType> = ({
	stateData,
}) => {
	const [ isMode, setMode ] = useSwitcher<ValueOf<typeof MAP_MODE>>(MAP_MODE['2024'])
	const { width } = useWindowSize()

	const renderByMode = () => {
		if (isMode(MAP_MODE['2021'])) {
			return stateData.stateYear2021.map((item: any) => (
				<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
			))
		}
		if (isMode(MAP_MODE['2024'])) {
			return stateData.stateYear2024.map((item: any) => (
				<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
			))
		}
		if (isMode(MAP_MODE['21vs24'])) {
			return ([] as VNode[])
				.concat(stateData.stateYear2021.map((item: any) => (
					<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
				)))
				.concat(stateData.stateYear2024.map((item: any) => (
					<GeoObject geometry={item} options={GEO_OBJECT_OPTIONS} />
				)))
		}
		if (isMode(MAP_MODE['POV'])) {
			return stateData.moscowPovPoints.map((pov) => (
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
				{/* TODO: вынести ключ в .env */}
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
