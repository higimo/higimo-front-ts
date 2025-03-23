import { createRef } from 'preact'

import data from './data.json'

import {
	YMaps,
	Map,
} from 'react-yandex-maps'

export const TourismMapsFigure = () => {
	// @ts-ignore
	const refMap = createRef(null)

	const handleMapLoad = ymaps => {
		(async () => {
			const map = refMap.current
			const objectManager = new ymaps.ObjectManager()

            objectManager.add(data)
            map.geoObjects.add(objectManager)
		})()
	}
	return (
		<YMaps query={{ lang: 'ru_RU' }}>
			<Map
				// @ts-ignore
				instanceRef={refMap}
				onLoad={handleMapLoad}
				width='1000px'
				height='500px'
				defaultState={{
					zoom: 10,
					center: [55.73, 37.75],
				}}
				modules={[
					'Polygon',
					'ObjectManager',
				]}
			>
			</Map>
		</YMaps>
	)
}
