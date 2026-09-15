import { FunctionComponent } from 'preact'
import { TextContainer } from 'components/ui/text-container'

import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismMapsMoscowBar } from 'components/tourism/tourism-maps-moscow-bar'

import '../../tourism-style.css'
import '../yandex-map.css'

export const TourismMoscowBarPage: FunctionComponent = () => {
	usePageTitle('Московские бары')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>Московские бары</TourismHeader>
			</TextContainer>

			<TourismMapsMoscowBar />
		</div>
	)
}
