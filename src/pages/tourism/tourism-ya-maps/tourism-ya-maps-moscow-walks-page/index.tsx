import { FunctionComponent } from 'preact'
import { TextContainer } from '../../../../components/ui/text-container'

import { useRoute } from 'preact-iso'

import { TourismMapsFigure } from '../../../../components/tourism/tourism-maps-figure'
import { Breadcrumps } from '../../../../components/ui/breadcrumps'
import { TourismMainMenu } from '../../../../components/tourism/tourism-main-menu'

import '../../tourism-style.css'
import { TourismMapsMoscowBar } from '../../../../components/tourism/tourism-maps-moscow-bar'

export const TourismYaMapsMoscowWalksPage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'Обхожу Москву'

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<TextContainer>
				<h1>Обхожу Москву</h1>
			</TextContainer>
			<TourismMapsMoscowBar />
			<TourismMapsFigure />
		</div>
	)
}
