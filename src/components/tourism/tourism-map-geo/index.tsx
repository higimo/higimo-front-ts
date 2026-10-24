import { BasePointType, Coord } from 'utils.type'
import { YaMapOptionType, YaMapPropertyType } from 'api-types/yamap.types'

import { useWindowSize } from 'hook/browser/use-window-size'

import { Clusterer, FullscreenControl, Map, Placemark, Polyline, YMaps } from 'react-yandex-maps'

// TODO: [FEATURE_MAP] посещение рек РФ
// TODO: [FEATURE_MAP] мб, переехать на API3 https://yandex.ru/maps-api/docs/js-api/index.html

const DEFAULT_ZOOM = 8
const DEFAULT_CENTER = [55.73, 37.75] as Coord // Москва

type TourismMapGeoPropsType<T extends BasePointType, L extends Coord> = {
	items?: T[]
	lines?: L[]
	zoom?: number
	center?: Coord,
	cluster?: boolean
	/**
	 * Обработчик параметров точки (Placemark)
	 */
	propertyHandler?: (point: T) => YaMapPropertyType
	/**
	 * Обработчик опций точки (Placemark)
	 */
	optionHandler?: (point: T) => YaMapOptionType
}

export const TourismMapGeo = <T extends BasePointType, L extends Coord>({
	items,
	lines,
	zoom = DEFAULT_ZOOM,
	center = DEFAULT_CENTER,
	cluster = true,
	propertyHandler,
	optionHandler,
}: TourismMapGeoPropsType<T, L>) => {
	const { width, height } = useWindowSize()

	return (
		<div className="yandex-map">
			<YMaps query={{ lang: 'ru_RU', apikey: import.meta.env.VITE_YA_MAP_KEY }}>
				<Map
					width={Math.min(width * .85, 1200)}
					height={Math.min(height * .6, 750)}
					defaultState={{
						zoom,
						center,
					}}
				>
					<FullscreenControl />
					{lines && (
						<Polyline
							geometry={lines}
							options={{
								strokeColor: '#000',
								strokeWidth: 4,
								strokeOpacity: 0.5
							}}
						/>
					)}
					<Clusterer
						options={{
							groupByCoordinates: !cluster,
							gridSize: 40,
							clusterDisableClickZoom: true,
							clusterHideIconOnBalloonOpen: false,
							clusterBalloonContentLayout: 'cluster#balloonAccordion',
							clusterBalloonContentLayoutWidth: 350,
							clusterIconColor: '#344d3d', // Иконка кластера #b3b3b3
							hasBalloon: true,
						}}
						modules={cluster ? [
							'clusterer.addon.balloon',
							'clusterer.addon.hint',
						] : []}
					>
						{!!items && items.map((point) => (
							<Placemark
								key={point.title}
								modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
								geometry={point.coord}
								properties={propertyHandler && propertyHandler(point)}
								options={optionHandler && optionHandler(point)}
							/>
						))}
					</Clusterer>
				</Map>
			</YMaps>
		</div>
	)
}
