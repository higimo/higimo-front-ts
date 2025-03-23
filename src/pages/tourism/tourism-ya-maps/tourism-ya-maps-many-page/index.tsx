import { FunctionComponent } from 'preact'

import { useRoute } from 'preact-iso'

import { TextContainer } from '../../../../components/ui/text-container'
import { TourismMapsMany } from '../../../../components/tourism/tourism-maps-many'
import { Breadcrumps } from '../../../../components/ui/breadcrumps'
import { TourismMainMenu } from '../../../../components/tourism/tourism-main-menu'

import '../../tourism-style.css'

export const TourismYaMapsManyPage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'Оптимальное добавление множества меток'

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<TextContainer>
				<h1>Оптимальное добавление множества меток</h1>
			</TextContainer>
			<TourismMapsMany />
		</div>
	)
}
