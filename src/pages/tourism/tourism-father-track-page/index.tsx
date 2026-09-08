import { FunctionComponent } from 'preact'
import { Coord } from 'utils.type'
import { PageJSONData } from 'components/block-renderer/types'
import { PovType } from 'components/tourism/data/types'

import { useEffect, useState } from 'preact/hooks'
import { useJsonApi } from 'hook/fetch/use-json-api'
import { usePageTitle } from 'hook/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'

import '../tourism-style.css'
import './style.css'

type FatherData = {
	roadmap: PageJSONData
	mainTrack: Coord[]
	cities: PovType[]
	rostovNaDonuPlace: PovType[]
	rostovNaDonuPolygon: Coord[]
}

type LoaderFatherDataType = { isLoading: true, data: null } | { isLoading: false, data: FatherData }

const useLoaderFatherData = () => {
	const [result, setResult] = useState<LoaderFatherDataType>({
		isLoading: true,
		data: null,
	})

	const roadmap = useJsonApi<PageJSONData>('/json/tourism/father-trip-roadmap.json')

	const mainTrack = useJsonApi<Coord[]>('/json/tourism/father-trip-main-track.json')
	const cities = useJsonApi<PovType[]>('/json/tourism/father-trip-cities.json')
	const rostovNaDonuPlace = useJsonApi<PovType[]>('/json/tourism/father-trip-rostov-na-donu-place.json')
	const rostovNaDonuPolygon = useJsonApi<Coord[]>('/json/tourism/father-trip-rostov-na-donu-polygon.json')

	useEffect(() => {
		const isLoading = roadmap === null || mainTrack === null || cities === null
			|| rostovNaDonuPolygon === null || rostovNaDonuPlace === null
		if (isLoading) {
			if (!result.isLoading) {
				setResult({
					isLoading: true,
					data: null
				})
			}
			return
		}

		setResult({
			isLoading: false,
			data: {
				roadmap,
				mainTrack,
				cities,
				rostovNaDonuPolygon,
				rostovNaDonuPlace,
			}
		})
	}, [roadmap, mainTrack, cities, rostovNaDonuPolygon, rostovNaDonuPlace])

	return result
}

export const TourismFatherTrackPage: FunctionComponent = () => {
	usePageTitle('Путешествие с отцом')

	const { isLoading, data } = useLoaderFatherData()

	if (isLoading) {
		return <Loading />
	}

	const { roadmap, cities, mainTrack, rostovNaDonuPolygon, rostovNaDonuPlace } = data

	const modCities = cities.concat(rostovNaDonuPlace)
	const lines = ([] as Coord[])
		.concat(mainTrack)
		.concat(rostovNaDonuPolygon)

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<TextContainer>
				<Breadcrumps />
			</TextContainer>
			<TextContainer>
				<TourismHeader main>Путешествие с отцом</TourismHeader>
			</TextContainer>
			<TextContainer className="car-list">
				{roadmap.blocks.map((child, idx) => (
					<BlockRenderer key={idx} block={child} />
				))}
			</TextContainer>
			<TextContainer className="car-list">

			</TextContainer>
			<TourismMapGeo<PovType, Coord>
				lines={lines}
				items={modCities}
			/>
		</div>
	)
}

export default TourismFatherTrackPage
