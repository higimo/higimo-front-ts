import { FunctionComponent } from 'preact'
import { SimpleMapPoint, YaMapPolygon } from 'api-types/tourism.types'

import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LoadSuspense } from 'components/ui/load-suspense'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMoscowWalkaround } from 'components/tourism/tourism-maps-figure'

import '../../tourism-style.css'
import '../yandex-map.css'

type WalkaroundType = {
	moscowPovPoints: SimpleMapPoint[]
	stateYear2021: YaMapPolygon[]
	stateYear2024: YaMapPolygon[]
}

export const TourismMoscowWalkaroundPage: FunctionComponent = () => {
	const [ data ] = useMultiJsonApi<WalkaroundType>({
		moscowPovPoints: '/json/tourism/moscow-pov-points.json',
		stateYear2021: '/json/tourism/walk-moscow-2021.json',
		stateYear2024: '/json/tourism/walk-moscow-2024.json',
	})

	return (
		<Layout title="Обхожу Москву">
			{/* TODO: [LIGHT] наверно, div нужно туда занести, ради className */}
			<div className="tourism-identy-page">
				<TourismMainMenu />

				<TextContainer>
					<Breadcrumps />
				</TextContainer>

				<TextContainer>
					<TourismHeader main>Обхожу Москву</TourismHeader>
				</TextContainer>

				<LoadSuspense data={data}>
					<EmptyData data={data}>
						<TourismMoscowWalkaround
							moscowPovPoints={data.data.moscowPovPoints!}
							stateYear2021={data.data.stateYear2021!}
							stateYear2024={data.data.stateYear2024!}
						/>
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
