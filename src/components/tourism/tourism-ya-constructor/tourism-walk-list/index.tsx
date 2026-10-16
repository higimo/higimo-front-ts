import { FunctionComponent } from 'preact'
import { YaMapType } from 'api-types/yamap.types'

import { TourismBulletList } from 'components/tourism/ui/tourism-bullet-list'
import { TourismBulletListItem } from 'components/tourism/ui/tourism-bullet-list-item'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type TourismWalkListPropsType = {
	yamapList: YaMapType[] | null
}

export const TourismWalkList: FunctionComponent<TourismWalkListPropsType> = ({
	yamapList,
}) => yamapList && (
	<TourismBulletList>
		{yamapList.map(item => (
			<TourismBulletListItem
				key={item.id}
				className="tourism-walk-gallery__item"
				href={ROUTE_LINK.tourismWalkDetail({ idcode: item.code })}
				title={item.name}
			/>
		))}
	</TourismBulletList>
)
