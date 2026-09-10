import { FunctionComponent } from 'preact'

import { TourismCustomList } from 'components/tourism/tourism-custom-list/TourismCustomList'
import { TourismCustomListItem } from 'components/tourism/tourism-custom-list/TourismCustomListItem'

// TODO: [LIGHT] перенести в page
import { links } from 'components/data/concert/nashe-lineup-gallery/data'

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
