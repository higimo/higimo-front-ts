import { FunctionComponent } from 'preact'

import { TourismCustomList } from 'components/tourism/tourism-custom-list'
import { TourismCustomListItem } from 'components/tourism/tourism-custom-list-item'

import { NASHE_LINK } from 'data/tourism/nashe-link'

export const NasheLineupList: FunctionComponent = () => (
	<TourismCustomList className="nashe-other-lineup">
		{NASHE_LINK.map(nasheLink =>
			<TourismCustomListItem
				key={nasheLink.href}
				href={nasheLink.href as string}
				bullit={nasheLink.title}
				value="Лайнап"
			/>
		)}
	</TourismCustomList>
)
