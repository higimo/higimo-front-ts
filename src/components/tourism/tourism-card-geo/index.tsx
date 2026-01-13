import cs from 'classnames'
import { FunctionComponent } from 'preact';
import { PovType } from '../tourism-maps-figure/data/russia-city2';

import './style.css'

type TourismCardGeoPropsType = {
	items: PovType[];
}
export const TourismCardGeo: FunctionComponent<TourismCardGeoPropsType> = ({ items }) => {
	return (
		<div className="tourism-card-geo">
			{items.map(povItem => (
				<div
					className={cs(
						'tourism-card-geo__item',
						{
							'tourism-card-geo__item--visited': 'visited' in povItem && povItem.visited
						}
					)}
				>
					<div className="tourism-card-geo__title">
						{povItem.title}
					</div>
					<div className="tourism-card-geo__coord">
						{povItem.coord.join(', ')}
					</div>
					<div className="tourism-card-geo__country">
						{[
							'okrug' in povItem && povItem.okrug,
							'region' in povItem && povItem.region,
							'country' in povItem ? povItem.country : 'Россия',
						].filter(Boolean).join(', ')}
					</div>
					<div className="tourism-card-geo__description">
						{povItem.description}
					</div>
					{!!povItem.population && (
						<div className="tourism-card-geo__population">
							Население: {povItem.population} К
						</div>
					)}
					<div className="tourism-card-geo__type">
						{povItem.type}
					</div>
				</div>
			))}
		</div>
	)
}