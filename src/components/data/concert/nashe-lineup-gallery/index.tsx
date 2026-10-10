import { FunctionComponent } from 'preact'

import { TourismCustomList } from 'components/tourism/tourism-custom-list/TourismCustomList'
import { TourismCustomListItem } from 'components/tourism/tourism-custom-list/TourismCustomListItem'

import { links } from 'components/data/concert/nashe-lineup-gallery/data'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const NasheLineupGallery: FunctionComponent = () => (
	<TourismCustomList className="nashe-other-lineup">
		{links.map(nasheLink =>
			<TourismCustomListItem
				href={nasheLink.href}
				bullit={nasheLink.title}
				value="Лайнап"
			/>
		)}
	</TourismCustomList>
)
