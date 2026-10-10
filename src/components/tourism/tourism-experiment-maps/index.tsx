import { FunctionComponent } from 'preact'

import { tourismExperimentMapsData } from '../../../data/tourism/tourism-experiment-map-data'

import { TourismBulletList } from 'components/tourism/tourism-bullet-list'
import { TourismBulletListItem } from 'components/tourism/tourism-bullet-list-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const TourismExperimentMaps: FunctionComponent = () => (
	<TourismBulletList>
		{tourismExperimentMapsData.map(item => (
			<TourismBulletListItem
				className="tourism-walk-gallery__item"
				href={item.href}
				title={item.title}
			/>
		))}
	</TourismBulletList>
)
