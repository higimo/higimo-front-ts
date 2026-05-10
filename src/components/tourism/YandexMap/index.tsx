import { FunctionComponent } from 'preact'

import { useWindowSize } from 'hook/use-window-size'

import { YMaps, Map, FullscreenControl, Placemark } from 'react-yandex-maps'

import { barColor, barIcon } from 'components/tourism/tourism-maps-figure/data/bar-pov-moscow'

// TODO: [MEDIUM] недо дубль TourismMapGeo, надо объединить
type YandexMapPropsType = {
	items: any[]
}
export const YandexMap: FunctionComponent<YandexMapPropsType> = ({ items }) => {
	const { width, height } = useWindowSize()

	return (
		<div className="yandex-map">
			<YMaps query={{ lang: 'ru_RU', apikey: '36482037-351d-458f-87ce-c2bf4a1e508b' }}>
				<Map
					width={Math.min(width * .85, 1200)}
					height={Math.min(height * .6, 750)}
					defaultState={{
						zoom: 12,
						center: [55.758772, 37.617933],
					}}
				>
					<FullscreenControl />
					{items.map((point) => (
						<Placemark
							modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
							geometry={point.coord}
							properties={{
								hintContent: point.title,
								iconCaption: point.title,
							}}
							options={{
								preset: barIcon(point.icon),
								iconColor: barColor(point.color),
								iconSize: [15, 15],
							}}
						/>
					))}
				</Map>
			</YMaps>
		</div>
	)
}
