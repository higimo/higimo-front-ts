import { FunctionComponent } from 'preact'
import { SimpleMapPoint, YaMapPolygon } from 'api-types/tourism.types'

import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { Heading } from 'components/ui/heading/Heading'
import { TourismMainMenu } from 'components/tourism/ui/tourism-main-menu'
import { TourismMoscowWalkaroundDetail } from 'components/tourism/tourism-maps/tourism-moscow-walkaround-detail'

import '../../tourism-style.css'
import '../yandex-map.css'

type WalkaroundType = {
	moscowPoiPoints: SimpleMapPoint[]
	stateYear2021: YaMapPolygon[]
	stateYear2024: YaMapPolygon[]
}

export const TourismMoscowWalkaroundPage: FunctionComponent = () => {
	const [ jsonCollection ] = useMultiJsonApi<WalkaroundType>({
		moscowPoiPoints: '/json/tourism/moscow-pov-points.json',
		stateYear2021: '/json/tourism/walk-moscow-2021.json',
		stateYear2024: '/json/tourism/walk-moscow-2024.json',
	})

	const stateArr = [jsonCollection.moscowPoiPoints, jsonCollection.stateYear2021, jsonCollection.stateYear2024]

	return (
		<Layout title="Обхожу Москву" className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<Heading variant="tourism">Обхожу Москву</Heading>
			</TextContainer>

			<LoadSuspense data={stateArr}>
				<EmptyData data={stateArr}>
					<TourismMoscowWalkaroundDetail
						moscowPoiPoints={jsonCollection.moscowPoiPoints.data}
						stateYear2021={jsonCollection.stateYear2021.data}
						stateYear2024={jsonCollection.stateYear2024.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
