import { MoscowMuseumType } from 'api-types/tourism.types'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'
import { FunctionComponent } from 'preact'

import './style.css'

type MuseumGalleryPropsType = {
	museums: MoscowMuseumType[]
}

export const MuseumGallery: FunctionComponent<MuseumGalleryPropsType> = ({ museums }) => (
	<div className="museum-gallery">
		{museums.map(museum => (
			<div className="museum-gallery__item">
				<TourismSecondary main className="museum-gallery__name">
					{museum.name}
				</TourismSecondary>
				<TourismSecondary className="museum-gallery__adress">
					{museum.adress}
				</TourismSecondary>
			</div>
		))}
	</div>
)
