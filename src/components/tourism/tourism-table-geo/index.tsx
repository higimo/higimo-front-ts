import cs from 'classnames'

import { FunctionComponent } from 'preact'

import { PovType } from '../data/types'

import './style.css'

type TourismTableGeoPropsType = {
	items: PovType[]
}
export const TourismTableGeo: FunctionComponent<TourismTableGeoPropsType> = ({ items }) => {
	return (
		<div className="table-geo">
			<div className="table-geo__table">
				<div className="table-geo__item table-geo-row table-geo-row--header">
					<div className="table-geo-row__title">
						Название
					</div>
					<div className="table-geo-row__type">
						тип
					</div>
					<div className="table-geo-row__country">
						страна
					</div>
					<div className="table-geo-row__description">
						описание
					</div>
					<div className="table-geo-row__population">
						население
					</div>
				</div>
				{items.map(povItem => (
					<div
						className={cs(
							'table-geo__item table-geo-row',
							{
								'table-geo-row--visited': 'visited' in povItem && povItem.visited
							}
						)}
					>
						<div className="table-geo-row__title">
							{povItem.title}
							<div className="table-geo-row__coord">
								{povItem.coord.join(', ')}
							</div>
						</div>
						<div className="table-geo-row__country">
							{'country' in povItem ? povItem.country : 'Россия'}
						</div>
						{'description' in povItem && (
							<div className="table-geo-row__description">
								{povItem.description}
							</div>
						)}
						{'population' in povItem && (
							<div className="table-geo-row__population">
								{povItem.population}
							</div>
						)}
						<div className="table-geo-row__type">
							{povItem.type}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
