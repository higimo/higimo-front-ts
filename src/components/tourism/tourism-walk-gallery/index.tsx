import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { TourismBulletList } from '../tourism-bullet-list'
import { TourismBulletListItem } from '../tourism-bullet-list-item'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const TourismWalkGallery: FunctionComponent<{ yamapList: YaMapType[] }> = ({
	yamapList,
}) => (
	<TourismBulletList>
		{yamapList.map(item => (
			<TourismBulletListItem
				className="tourism-walk-gallery__item"
				href={ROUTE_LINKS.tourismWalkDetail({ idcode: item.code })}
				title={item.name}
			/>
		))}
	</TourismBulletList>
)
