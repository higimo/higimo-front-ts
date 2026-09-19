import { FunctionComponent } from 'preact'
import { HigimoMapPoint, YaMapPolygon } from 'api-types/tourism.types'

import { useLoadingState } from 'hook/fetch/use-loading-state'
import { useMultiJsonApi } from 'hook/fetch/use-multi-json-api'
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

type WalkaroundType = {
	moscowPovPoints: HigimoMapPoint[]
	stateYear2021: YaMapPolygon[]
	stateYear2024: YaMapPolygon[]
}

export const TourismMoscowWalkaroundPage: FunctionComponent = () => {
	usePageTitle('Обхожу Москву')

	const [ data ] = useMultiJsonApi<WalkaroundType>({
		moscowPovPoints: '/json/tourism/moscow-pov-points.json',
		stateYear2021: '/json/tourism/walk-moscow-2021.json',
		stateYear2024: '/json/tourism/walk-moscow-2024.json',
	})
	const isLoading = useLoadingState([data.status])
	const isError = data.status === 'ERROR'

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
						moscowPovPoints={data.data.moscowPovPoints!}
						stateYear2021={data.data.stateYear2021!}
						stateYear2024={data.data.stateYear2024!}
					/>
				)
			)}
		</div>
	)
}
