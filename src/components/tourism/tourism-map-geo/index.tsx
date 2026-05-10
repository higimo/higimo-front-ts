import { PovType } from 'components/tourism/tourism-maps-figure/data/russia-city2'
import { Fragment, FunctionComponent } from 'preact'

import { useWindowSize } from 'hook/use-window-size'

import { Clusterer, FullscreenControl, Map, Placemark, Polyline, YMaps } from 'react-yandex-maps'

// TODO: [FEATURE] посещение рек РФ

type TourismMapGeoPropsType = {
	items?: PovType[]
	lines?: number[][]
}
export const TourismMapGeo: FunctionComponent<TourismMapGeoPropsType> = ({ items, lines }) => {
	const { width, height } = useWindowSize()

	return (
		<Fragment>
			<div className="yandex-map">
				<YMaps query={{ lang: 'ru_RU', apikey: '36482037-351d-458f-87ce-c2bf4a1e508b' }}>
					<Map
						width={Math.min(width * .85, 1200)}
						height={Math.min(height * .6, 750)}
						defaultState={{
							zoom: 8,
							center: [55.73, 37.75],
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
								groupByCoordinates: false,
								gridSize: 40,
								clusterDisableClickZoom: true,
								clusterHideIconOnBalloonOpen: false,
								clusterBalloonContentLayout: 'cluster#balloonAccordion',
								clusterBalloonContentLayoutWidth: 350,
								clusterIconColor: '#344d3d', // Иконка кластера #b3b3b3
								hasBalloon: true,
							}}
							modules={[
								'clusterer.addon.balloon',
								'clusterer.addon.hint',
							]}
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
											point.type,
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
