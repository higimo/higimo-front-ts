import { FunctionComponent } from 'preact'

import { TOURISM_EXPERIMENT_MAP_LIST } from 'data/tourism/tourism-experiment-map-list'

import { TourismBulletList } from 'components/tourism/ui/tourism-bullet-list'
import { TourismBulletListItem } from 'components/tourism/ui/tourism-bullet-list-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const TourismExperimentMaps: FunctionComponent = () => (
	<TourismBulletList>
		{TOURISM_EXPERIMENT_MAP_LIST.map(item => (
			<TourismBulletListItem
				className="tourism-walk-gallery__item"
				href={item.href}
				title={item.title}
			/>
		))}
	</TourismBulletList>
)
