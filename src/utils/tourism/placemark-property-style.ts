import { PoiType } from 'api-types/tourism.types'


type PlaceMarkProperty = {
	hintContent: string
	iconCaption: string
	balloonContentHeader: string
	balloonContentBody: string
	balloonContentFooter: string
}

export const placemarkPropertyStyle = (point: PoiType): PlaceMarkProperty => ({
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
})

