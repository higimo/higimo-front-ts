import {createRef} from 'preact'

import {
	YMaps,
	Map,
} from 'react-yandex-maps'

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

const getDistrictColor = (iso) => {
	return (
		districtVisited.includes(iso) ? '#ff00ff' :
			(districtVacant.includes(iso) ? '#8396bf' : '#b7b7b7')
	)
		
}

export const TourismMapsRegion = () => {
	// @ts-ignore
	const mapRef = createRef(null)

	const handleMapLoad = ymaps => {
		(async () => {
			const borders = await ymaps.borders.load('RU', {
				lang: 'ru',
				quality: 1
			})

			const collection = new ymaps.GeoObjectCollection(null)
			mapRef.current.geoObjects.add(collection)

			borders.features.forEach(feature => {
				collection.add(new ymaps.GeoObject(feature, {
					fillColor: getDistrictColor(feature.properties.iso3166),
					strokeColor: getDistrictColor(feature.properties.iso3166),
					strokeOpacity: 0.3,
					fillOpacity: 0.3,
				}))
			})
		})()
	}

	return (
		<YMaps query={{ lang: 'ru_RU' }}>
			<Map
				// @ts-ignore
				instanceRef={mapRef}
				onLoad={handleMapLoad}
				width="1000px"
				height="500px"
				defaultState={{
					center: [65, 100],
					zoom: 2,
				}}
				modules={[
					'borders',
					'GeoObjectCollection',
					'GeoObject',
				]}
			>
			</Map>
		</YMaps>
	)
}
