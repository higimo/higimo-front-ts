import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'

import { useLoadMoscowWalkaround } from 'components/tourism/tourism-maps-figure/useLoadMoscowWalkaround'
import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { Loading } from 'components/ui/loading'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMoscowWalkaround } from 'components/tourism/tourism-maps-figure'

import '../../tourism-style.css'
import '../yandex-map.css'

export const TourismMoscowWalkaroundPage: FunctionComponent = () => {
	usePageTitle('Обхожу Москву')

	const { isLoading, data: stateData } = useLoadMoscowWalkaround()

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
				<TourismHeader main>
					Обхожу Москву
				</TourismHeader>
			</TextContainer>

			<TourismMoscowWalkaround
				stateData={stateData}
			/>
		</div>
	)
}
