import { Coord } from 'utils.type'
import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'
import { PovType } from 'components/tourism/types'

import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'
import { usePageTitle } from 'hook/browser/use-page-title'

import { BlockRenderer } from 'components/block-renderer/BlockRenderer'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
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
	usePageTitle('Путешествие с отцом')

	const [ data ] = useMultiJsonApi<FatherJsonType>({
		roadmap: '/json/tourism/father-trip-roadmap.json',
		mainTrack: '/json/tourism/father-trip-main-track.json',
		cities: '/json/tourism/father-trip-cities.json',
		rostovNaDonuPlace: '/json/tourism/father-trip-rostov-na-donu-place.json',
		rostovNaDonuPolygon: '/json/tourism/father-trip-rostov-na-donu-polygon.json',
	})

	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}

	const modCities = data.data.cities!
		.concat(data.data.rostovNaDonuPlace!)
	const lines = data.data.mainTrack!
		.concat(data.data.rostovNaDonuPolygon!)

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
				{(isError
					? (<NotFoundData />)
					: (data.data.roadmap!.blocks.map((child, idx) => (
						<BlockRenderer key={idx} block={child} />
					)))
				)}
			</TextContainer>

			{(isError
				? (<NotFoundData />)
				: (
					<TourismMapGeo<PovType, Coord>
						lines={lines}
						items={modCities}
					/>
				)
			)}
		</div>
	)
}

export default TourismFatherTrackPage
