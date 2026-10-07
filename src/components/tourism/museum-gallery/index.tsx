import { MoscowMuseumType } from 'api-types/tourism.types'
import { TourismSecondary } from 'components/tourism/tourism-paragraph'
import { FunctionComponent } from 'preact'

import './style.css'

type MuseumGalleryPropsType = {
	moscowMuseumList: MoscowMuseumType[] | null
}

export const MuseumGallery: FunctionComponent<MuseumGalleryPropsType> = ({
	moscowMuseumList
}) => moscowMuseumList && (
	<div className="museum-gallery">
		{moscowMuseumList.map(museum => (
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
