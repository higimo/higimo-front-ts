import { MoscowMuseumType } from 'api-types/tourism.types'
import { TourismSecondary } from 'components/tourism/ui/tourism-paragraph'
import { FunctionComponent } from 'preact'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type MuseumListPropsType = {
	moscowMuseumList: MoscowMuseumType[] | null
}

export const MuseumList: FunctionComponent<MuseumListPropsType> = ({
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
