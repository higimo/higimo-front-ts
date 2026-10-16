import { FunctionComponent } from 'preact'
import { PoiType } from 'api-types/tourism.types'

import cs from 'classnames'

import './style.css'

type TourismCardGeoPropsType = {
	items: PoiType[]
}
export const TourismCardGeo: FunctionComponent<TourismCardGeoPropsType> = ({ items }) => {
	return (
		<div className="tourism-card-geo">
			{items.map((poiItem, key) => (
				<div
					key={key}
					className={cs(
						'tourism-card-geo__item',
						{
							'tourism-card-geo__item--visited': 'visited' in poiItem && poiItem.visited
						}
					)}
				>
					<div className="tourism-card-geo__title">
						{poiItem.title}
					</div>
					<div className="tourism-card-geo__coord">
						{poiItem.coord.join(', ')}
					</div>
					<div className="tourism-card-geo__country">
						{[
							'okrug' in poiItem && poiItem.okrug,
							'region' in poiItem && poiItem.region,
							'country' in poiItem ? poiItem.country : 'Россия',
						].filter(Boolean).join(', ')}
					</div>
					{'description' in poiItem && (
						<div className="tourism-card-geo__description">
							{poiItem.description}
						</div>
					)}
					{'population' in poiItem && (
						<div className="tourism-card-geo__population">
							Население: {poiItem.population} К
						</div>
					)}
					<div className="tourism-card-geo__type">
						{poiItem.type}
					</div>
				</div>
			))}
		</div>
	)
}
