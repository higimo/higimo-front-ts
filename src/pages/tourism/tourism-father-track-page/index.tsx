import { Coord } from 'utils.type'
import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'
import { PovType } from 'api-types/tourism.types'

import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMapGeo } from 'components/tourism/tourism-map-geo'

import '../tourism-style.css'
import './style.css'

type FatherJsonType = {
	roadmap: PageJSONData
	cities: PovType[]
	rostovNaDonuPlace: PovType[]
	mainTrack: Coord[]
	rostovNaDonuPolygon: Coord[]
}

export const TourismFatherTrackPage: FunctionComponent = () => {
	const [ jsonData ] = useMultiJsonApi<FatherJsonType>({
		roadmap:             '/json/tourism/father-trip-roadmap.json',
		cities:              '/json/tourism/father-trip-cities.json',
		rostovNaDonuPlace:   '/json/tourism/father-trip-rostov-na-donu-place.json',
		mainTrack:           '/json/tourism/father-trip-main-track.json',
		rostovNaDonuPolygon: '/json/tourism/father-trip-rostov-na-donu-polygon.json',
	})

	const modCities = (jsonData.cities.data || [])
		.concat(jsonData.rostovNaDonuPlace.data || [])
	const lines = (jsonData.mainTrack.data || [])
		.concat(jsonData.rostovNaDonuPolygon.data || [])

	const stateJsonData = [
		jsonData.mainTrack,
		jsonData.cities,
		jsonData.rostovNaDonuPlace,
		jsonData.rostovNaDonuPolygon,
	]

	return (
		<Layout title="Путешествие с отцом" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Путешествие с отцом</TourismHeader>
			</TextContainer>

			<TextContainer className="car-list">
				<LoadSuspense data={jsonData.roadmap}>
					<EmptyData data={jsonData.roadmap}>
						{jsonData.roadmap.data && jsonData.roadmap.data.blocks.map((child, idx) => (
							<BlockRenderer key={idx} block={child} />
						))}
					</EmptyData>
				</LoadSuspense>
			</TextContainer>

			<LoadSuspense data={stateJsonData}>
				<EmptyData data={stateJsonData}>
					<TourismMapGeo<PovType, Coord>
						lines={lines}
						items={modCities}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
