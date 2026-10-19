import { MoscowMuseumType } from 'api-types/tourism.types'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'
import { FunctionComponent } from 'preact'

import './style.css'

type MuseumListPropsType = {
	moscowMuseumList: MoscowMuseumType[]
}

export const MuseumList: FunctionComponent<MuseumListPropsType> = ({
	moscowMuseumList,
}) => (
	<div className="museum-gallery">
		{moscowMuseumList.map(museum => (
			<div key={museum.name} className="museum-gallery__item">
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
