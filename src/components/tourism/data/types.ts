export type YaMapPolygon = {
	type: 'Polygon'
	coordinates: number[][][]
}

export type HigimoMapPoint = {
	coord: [number, number]
	title: string
	color: `#${string}` // hex
}
