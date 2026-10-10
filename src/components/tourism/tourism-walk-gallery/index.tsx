import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { TourismBulletList } from '../tourism-bullet-list'
import { TourismBulletListItem } from '../tourism-bullet-list-item'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type TourismWalkGalleryPropsType = {
	yamapList: YaMapType[] | null
}

export const TourismWalkGallery: FunctionComponent<TourismWalkGalleryPropsType> = ({
	yamapList,
}) => yamapList && (
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
