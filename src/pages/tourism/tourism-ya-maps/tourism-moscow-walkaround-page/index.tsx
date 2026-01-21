import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'

import { usePageTitle } from 'hook/use-page-title'

import { TourismMoscowWalkaround } from 'components/tourism/tourism-maps-figure'
import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'

import '../../tourism-style.css'

export const TourismMoscowWalkaroundPage: FunctionComponent = () => {
	usePageTitle('Обхожу Москву')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps />
			<TextContainer>
				<h1>Обхожу Москву</h1>
			</TextContainer>
			<TourismMoscowWalkaround />
		</div>
	)
}
