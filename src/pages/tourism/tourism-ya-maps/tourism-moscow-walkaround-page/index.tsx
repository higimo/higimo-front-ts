import { FunctionComponent } from 'preact'
import { HigimoMapPoint, YaMapPolygon } from 'components/tourism/types'

import { useJsonApi } from 'hook/fetch/use-json-api'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'
import { TextContainer } from 'components/ui/text-container'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMoscowWalkaround } from 'components/tourism/tourism-maps-figure'

import '../../tourism-style.css'
import '../yandex-map.css'

export const TourismMoscowWalkaroundPage: FunctionComponent = () => {
	usePageTitle('Обхожу Москву')

	const [ moscowPovPoints ] = useJsonApi<HigimoMapPoint[]>('/json/tourism/moscow-pov-points.json')
	const [ stateYear2021 ] = useJsonApi<YaMapPolygon[]>('/json/tourism/walk-moscow-2021.json')
	const [ stateYear2024 ] = useJsonApi<YaMapPolygon[]>('/json/tourism/walk-moscow-2024.json')
	const isLoading = useLoadingState([moscowPovPoints.status, stateYear2021.status, stateYear2024.status])
	const isError = [moscowPovPoints.status, stateYear2021.status, stateYear2024.status]
		.some(status => status === 'ERROR')

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Обхожу Москву</TourismHeader>
			</TextContainer>

			{(isError
				? (<NotFoundData />)
				: (
					<TourismMoscowWalkaround
						moscowPovPoints={moscowPovPoints.data}
						stateYear2021={stateYear2021.data}
						stateYear2024={stateYear2024.data}
					/>
				)
			)}
		</div>
	)
}
