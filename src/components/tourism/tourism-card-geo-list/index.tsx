import { FunctionComponent } from 'preact'
import { PoiType } from 'api-types/tourism.types'

import { TourismCardGeoItem } from 'components/tourism/tourism-card-geo-item'

import './style.css'

type TourismCardGeoListPropsType = {
	items: PoiType[]
}

export const TourismCardGeoList: FunctionComponent<TourismCardGeoListPropsType> = ({
	items,
}) => (
	<div className="tourism-card-geo">
		{items.map((poiItem, key) => (
			<TourismCardGeoItem
				key={key}
				{...poiItem}
			/>
		))}
	</div>
)
