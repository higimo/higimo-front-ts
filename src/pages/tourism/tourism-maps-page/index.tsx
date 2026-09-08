import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { Breadcrumps } from 'components/ui/breadcrumps'
import { TextContainer } from 'components/ui/text-container'
import { TourismExperimentMaps } from 'components/tourism/tourism-experiment-maps'
import { TourismHeader } from 'components/tourism/tourism-header'
import { TourismMainMenu } from 'components/tourism/tourism-main-menu'
import { TourismWalkGallery } from 'components/tourism/tourism-walk-gallery'

import '../tourism-style.css'

export const TourismMapsPage: FunctionComponent = () => {
	usePageTitle('Карты путешествий')

	return (
		<div className="tourism-identy-page">
			<TourismMainMenu />

			<TextContainer>
				<Breadcrumps />
			</TextContainer>

			<TextContainer>
				<TourismHeader main>
					Карты путешествий
				</TourismHeader>
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Эксперименты в Я.Картах</TourismHeader>
				<TourismExperimentMaps />
			</TextContainer>

			<TextContainer>
				<TourismHeader secondary>Конструктор карт</TourismHeader>
				<TourismWalkGallery />
			</TextContainer>
		</div>
	)
}
