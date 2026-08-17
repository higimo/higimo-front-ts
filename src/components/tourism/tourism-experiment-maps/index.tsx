import { FunctionComponent } from 'preact'

import { tourismExperimentMapsData } from './data'

import { TourismBulletList } from '../tourism-bullet-list'
import { TourismBulletListItem } from '../tourism-bullet-list-item'

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
