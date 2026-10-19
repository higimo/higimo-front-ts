import { PoiType } from 'api-types/tourism.types'

type PlaceMarkStype = {
	iconColor: '#344d3d' | '#b3b3b3'
	iconSize: [number, number]
}

export const placemarkOptionStyle = (point: PoiType): PlaceMarkStype => ({
	iconColor: 'visited' in point && point.visited ? '#344d3d' : '#b3b3b3',
	iconSize: [15, 15],
})
