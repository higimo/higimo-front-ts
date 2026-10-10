import { FunctionComponent } from 'preact'

import { TourismCustomList } from 'components/tourism/tourism-custom-list'
import { TourismCustomListItem } from 'components/tourism/tourism-custom-list-item'

import { nasheLinks } from 'data/tourism/nashe-links'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const NasheLineupGallery: FunctionComponent = () => (
	<TourismCustomList className="nashe-other-lineup">
		{nasheLinks.map(nasheLink =>
			<TourismCustomListItem
				href={nasheLink.href}
				bullit={nasheLink.title}
				value="Лайнап"
			/>
		)}
	</TourismCustomList>
)
