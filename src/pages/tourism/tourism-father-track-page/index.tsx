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
	mainTrack: Coord[]
	cities: PovType[]
	rostovNaDonuPlace: PovType[]
	rostovNaDonuPolygon: Coord[]
}

export const TourismFatherTrackPage: FunctionComponent = () => {
	const [ data ] = useMultiJsonApi<FatherJsonType>({
		roadmap:             '/json/tourism/father-trip-roadmap.json',
		mainTrack:           '/json/tourism/father-trip-main-track.json',
		cities:              '/json/tourism/father-trip-cities.json',
		rostovNaDonuPlace:   '/json/tourism/father-trip-rostov-na-donu-place.json',
		rostovNaDonuPolygon: '/json/tourism/father-trip-rostov-na-donu-polygon.json',
	})

	const modCities = data.data.cities!
		.concat(data.data.rostovNaDonuPlace!)
	const lines = data.data.mainTrack!
		.concat(data.data.rostovNaDonuPolygon!)

	return (
		<Layout title="Путешествие с отцом">
			<div className="tourism-identy-page">
				<TourismMainMenu />

				<TextContainer>
					<Breadcrumps />
				</TextContainer>

				<TextContainer>
					<TourismHeader main>Путешествие с отцом</TourismHeader>
				</TextContainer>

				<TextContainer className="car-list">
					<LoadSuspense data={data}>
						<EmptyData data={data}>
							{data.data.roadmap!.blocks.map((child, idx) => (
								<BlockRenderer key={idx} block={child} />
							))}
						</EmptyData>
					</LoadSuspense>
				</TextContainer>

				<LoadSuspense data={data}>
					<EmptyData data={data}>
						<TourismMapGeo<PovType, Coord>
							lines={lines}
							items={modCities}
						/>
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
