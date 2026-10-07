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
	const [ jsonCollection ] = useMultiJsonApi<FatherJsonType>({
		roadmap:             '/json/tourism/father-trip-roadmap.json',
		cities:              '/json/tourism/father-trip-cities.json',
		rostovNaDonuPlace:   '/json/tourism/father-trip-rostov-na-donu-place.json',
		mainTrack:           '/json/tourism/father-trip-main-track.json',
		rostovNaDonuPolygon: '/json/tourism/father-trip-rostov-na-donu-polygon.json',
	})

	const modCities = (jsonCollection.cities.data || [])
		.concat(jsonCollection.rostovNaDonuPlace.data || [])
	const lines = (jsonCollection.mainTrack.data || [])
		.concat(jsonCollection.rostovNaDonuPolygon.data || [])

	const stateJsonData = [
		jsonCollection.mainTrack,
		jsonCollection.cities,
		jsonCollection.rostovNaDonuPlace,
		jsonCollection.rostovNaDonuPolygon,
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
				<LoadSuspense data={jsonCollection.roadmap}>
					<EmptyData data={jsonCollection.roadmap}>
						{jsonCollection.roadmap.data && jsonCollection.roadmap.data.blocks.map((child, idx) => (
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
