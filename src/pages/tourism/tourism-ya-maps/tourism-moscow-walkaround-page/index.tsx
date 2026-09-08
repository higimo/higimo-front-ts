import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'

import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMoscowWalkaround } from 'components/tourism/tourism-maps-figure'

import '../../tourism-style.css'

export const TourismMoscowWalkaroundPage: FunctionComponent = () => {
	usePageTitle('Обхожу Москву')

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

			<TourismMoscowWalkaround />
		</div>
	)
}
