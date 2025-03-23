import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { TextContainer } from '../../../../components/ui/text-container'
import { TourismMapsDiagram } from '../../../../components/tourism/tourism-maps-diagram'
import { Breadcrumps } from '../../../../components/ui/breadcrumps'
import { TourismMainMenu } from '../../../../components/tourism/tourism-main-menu'

import '../../tourism-style.css'

export const TourismYaMapsDiagramPage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'Макет в виде круговой диаграммы'

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<TextContainer>
				<h1>Макет в виде круговой диаграммы</h1>
			</TextContainer>
			<TourismMapsDiagram />
		</div>
	)
}
