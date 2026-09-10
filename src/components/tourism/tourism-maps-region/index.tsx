import { createRef } from 'preact'

import { useWindowSize } from 'hook/browser/use-window-size'

import { YMaps, Map, YMapsApi } from 'react-yandex-maps'

import '../yandex-map.css'

// TODO: [LIGHT] перенести в словарь
const districtVisited = [
	'RU-VLA', 'RU-VGG', 'RU-KGD', 'RU-KIR', 'RU-LEN', 'RU-MOS', 'RU-NIZ', 'RU-NGR',
	'RU-NVS', 'RU-PSK', 'RU-SVE', 'RU-TVE', 'RU-TUL', 'RU-TYU', 'RU-YAR', 'RU-DA',
	'RU-IN',  'RU-KB',  'RU-KC',  'RU-ME',  'RU-AL',  'RU-SE',  'RU-TA',  'RU-CE',
	'RU-CU',  'RU-ALT', 'RU-KDA', 'RU-STA', 'RU-SPE', 'RU-MOW', 'RU-SEV', 'RU-KRY',
	'RU-KAM', 'RU-KHA'
]

const districtVacant = [
	'RU-BEL', 'RU-BRY', 'RU-VLG', 'RU-VOR', 'RU-IVA', 'RU-IRK', 'RU-KRS', 'RU-LIP',
	'RU-MUR', 'RU-OMS', 'RU-ORE', 'RU-ROS', 'RU-RYA', 'RU-SAM', 'RU-SAR', 'RU-SMO',
	'RU-TAM', 'RU-ULY', 'RU-CHE', 'RU-KL', 'RU-KR', 'RU-MO', 'RU-PER', 'RU-PRI',
	'RU-STA', 'RU-CHU', 'RU-YEV',
]

// TODO: [LIGHT] перенести в utils
const getDistrictColor = (iso: any) => {
	return (
		districtVisited.includes(iso) ? '#ff4aff' :
			(districtVacant.includes(iso) ? '#5a7bc3' : '#b7b7b7')
	)
}

export const TourismMapsRegion = () => {
	const mapRef = createRef()
	const { width, height } = useWindowSize()

	const handleMapLoad = (ymaps: YMapsApi) => {
		(async () => {
			const borders = await ymaps.borders.load('RU', {
				lang: 'ru',
				quality: 1
			})

			const collection = new ymaps.GeoObjectCollection(null)
			mapRef.current.geoObjects.add(collection)

			// TODO: [LIGHT] использовать стандартные компоненты
			borders.features.forEach((feature: any) => {
				collection.add(new ymaps.GeoObject(feature, {
					fillColor: getDistrictColor(feature.properties.iso3166),
					strokeColor: getDistrictColor(feature.properties.iso3166),
					strokeOpacity: 0.4,
					fillOpacity: 0.4,
				}))
			})
		})()
	}

	return (
		<div className="yandex-map">
			<YMaps query={{ lang: 'ru_RU' }}>
				<Map
					// @ts-ignore
					instanceRef={mapRef}
					onLoad={handleMapLoad}
					width={Math.min(width * .85, 1200)}
					height={Math.min(height * .6, 750)}
					defaultState={{
						center: [65, 100],
						zoom: 3,
					}}
					modules={[
						'borders',
						'GeoObjectCollection',
						'GeoObject',
					]}
				>
				</Map>
			</YMaps>
		</div>
	)
}
