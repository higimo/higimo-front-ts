import { Coord } from 'utils.type'
import { FunctionComponent } from 'preact'
import { PageJSONData } from 'components/block-renderer/types'
import { PovType } from 'components/tourism/types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
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

export const TourismFatherTrackPage: FunctionComponent = () => {
	usePageTitle('Путешествие с отцом')

	const [ roadmap ] = useJsonApi<PageJSONData>('/json/tourism/father-trip-roadmap.json')

	const [ mainTrack ] = useJsonApi<Coord[]>('/json/tourism/father-trip-main-track.json')
	const [ cities ] = useJsonApi<PovType[]>('/json/tourism/father-trip-cities.json')
	const [ rostovNaDonuPlace ] = useJsonApi<PovType[]>('/json/tourism/father-trip-rostov-na-donu-place.json')
	const [ rostovNaDonuPolygon ] = useJsonApi<Coord[]>('/json/tourism/father-trip-rostov-na-donu-polygon.json')

	const statusList = [
		mainTrack.status, cities.status,
		rostovNaDonuPlace.status, rostovNaDonuPolygon.status,
	]

	const isLoading = useLoadingState(statusList)
	const isError = statusList.some(i => i === 'ERROR')
	const isRoadmapError = roadmap.status === 'ERROR'

	if (isLoading) {
		return <Loading />
	}

	const modCities = cities.data
		.concat(rostovNaDonuPlace.data)
	const lines = mainTrack.data
		.concat(rostovNaDonuPolygon.data)

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
				{(isRoadmapError
					? (<NotFoundData />)
					: (roadmap.data.blocks.map((child, idx) => (
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
