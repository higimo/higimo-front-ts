import { Fragment } from 'preact'
import { BasePointType, Coord } from 'utils.type'

import { useWindowSize } from 'hook/browser/use-window-size'

import { Clusterer, FullscreenControl, Map, Placemark, Polyline, YMaps } from 'react-yandex-maps'

// TODO: [FEATURE] посещение рек РФ

const DEFAULT_ZOOM = 8
const DEFAULT_CENTER = [55.73, 37.75] as Coord// Москва

type TourismMapGeoPropsType<T extends BasePointType, L extends Coord> = {
	items?: T[]
	lines?: L[]
	zoom?: number
	center?: Coord,
	cluster?: boolean
}
export const TourismMapGeo = <T extends BasePointType, L extends Coord>({
	items,
	lines,
	zoom = DEFAULT_ZOOM,
	center = DEFAULT_CENTER,
	cluster = true
}: TourismMapGeoPropsType<T, L>) => {
	const { width, height } = useWindowSize()

	return (
		<Fragment>
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
						{lines && <Polyline
							geometry={lines}
							options={{
								strokeColor: '#000',
								strokeWidth: 4,
								strokeOpacity: 0.5
							}}
						/>}
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
									modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
									geometry={point.coord}
									properties={{
										hintContent: point.title,
										iconCaption: point.title,
										balloonContentHeader: point.title,
										balloonContentBody: [
											'type' in point && point.type,
											[
												'okrug' in point && point.okrug,
												'region' in point && point.region,
												'country' in point ? point.country : 'Россия',
											].filter(Boolean).join(', '),
											'description' in point && point.description,
										].filter(Boolean).join('<br />'),
										balloonContentFooter: [
											'visited' in point && point.visited ? 'Посетил' : 'Не посетил',
											'population' in point ? `Население: ${point.population} К` : false,
											point.coord.join(', '),
										].filter(Boolean).join(' | '),
									}}
									options={{
										iconColor: 'visited' in point && point.visited ? '#344d3d' : '#b3b3b3',
										iconSize: [15, 15],
									}}
								/>
							))}
						</Clusterer>
					</Map>
				</YMaps>
			</div>
		</Fragment>
	)
}
