import { FunctionComponent } from "preact"

import { useRoute } from "preact-iso"

import { TextContainer } from "../../../components/ui/text-container"
import { TourismWalkGallery } from "../../../components/tourism/tourism-walk-gallery"
import { TourismNashestviePreview } from "../../../components/tourism/tourism-nashestvie-preview"
import { TourismMainMenu } from "../../../components/tourism/tourism-main-menu"
import { Breadcrumps } from "../../../components/ui/breadcrumps"
import { CityStarsIntro } from "../../../components/tourism/city-stars-intro"

import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS"

import '../tourism-style.css'
import './style.css'

export const TourismIndexPage: FunctionComponent = () => {
	const { path } = useRoute()

	document.title = 'Туризм'

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />
			<Breadcrumps path={path} />
			<TextContainer>
				<h1 className="tourism-header">Путешествия</h1>
			</TextContainer>
			<TourismNashestviePreview />
			<TextContainer>
				<h2><a href={ROUTE_LINKS.tourismWalkIndex}>Где был на картах</a></h2>
				<p>
					<a href={ROUTE_LINKS.tourismMapsIndex}>Эксперименты в Яндекс картах</a>
				</p>
			</TextContainer>
			<TourismWalkGallery />
			<CityStarsIntro />
		</div>
	)
}
