import { FunctionComponent } from 'preact'

import { TourismCustomList } from 'components/tourism/tourism-custom-list'
import { TourismCustomListItem } from 'components/tourism/tourism-custom-list-item'

import { NASHE_LINK } from 'data/tourism/nashe-link'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const NasheLineupList: FunctionComponent = () => (
	<TourismCustomList className="nashe-other-lineup">
		{NASHE_LINK.map(nasheLink =>
			<TourismCustomListItem
				href={nasheLink.href as string}
				bullit={nasheLink.title}
				value="Лайнап"
			/>
		)}
	</TourismCustomList>
)
