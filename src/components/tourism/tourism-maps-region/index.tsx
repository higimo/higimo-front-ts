import { createRef } from 'preact'

import { useWindowSize } from 'hook/browser/use-window-size'

import { YMaps, Map, YMapsApi, FullscreenControl } from 'react-yandex-maps'

import { getDistrictColor } from 'utils/get-district-color'

// TODO: [BACKEND] страница больше не работает
// Надо разместить у себя файл
// https://huggingface.co/datasets/world-igr-plum/regions/raw/main/v2/RU_RU_ru_1.json
// И показать его как обычную геометрию, убрав handleMapLoad
// Загружать JSON как остальные JSON
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
			<YMaps query={{ lang: 'ru_RU', apikey: '36482037-351d-458f-87ce-c2bf4a1e508b' }}>
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
					<FullscreenControl />
				</Map>
			</YMaps>
		</div>
	)
}
