import { FunctionComponent } from 'preact'

import { TOURISM_EXPERIMENT_MAP_LIST } from 'data/tourism/tourism-experiment-map-list'

import { TourismBulletList } from 'components/tourism/ui/tourism-bullet-list'
import { TourismBulletListItem } from 'components/tourism/ui/tourism-bullet-list-item'

export const TourismExperimentMapList: FunctionComponent = () => (
	<TourismBulletList>
		{TOURISM_EXPERIMENT_MAP_LIST.map(item => (
			<TourismBulletListItem
				key={item.href}
				className="tourism-walk-gallery__item"
				href={item.href as string}
				title={item.title}
			/>
		))}
	</TourismBulletList>
)
