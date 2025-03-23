import { FunctionComponent } from "preact"

import { useRoute } from "preact-iso"

import { TextContainer } from "../../../components/ui/text-container"
import { TourismWalkGallery } from "../../../components/tourism/tourism-walk-gallery"
import { Breadcrumps } from "../../../components/ui/breadcrumps"
import { TourismMainMenu } from "../../../components/tourism/tourism-main-menu"

import '../tourism-style.css'
import './style.css'

export const TourismWalkPage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'Где был на картах'

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<TextContainer>
				<h1 className="tourism-header">Где был на картах</h1>
			</TextContainer>
			<TourismWalkGallery />
		</div>
	)
}
