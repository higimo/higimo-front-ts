import cs from 'classnames'

import { FunctionComponent } from 'preact'

import { PoiType } from 'api-types/tourism.types'

import './style.css'

type TourismTableGeoPropsType = {
	items: PoiType[]
}
export const TourismTableGeo: FunctionComponent<TourismTableGeoPropsType> = ({
	items
}) => (
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
			{items.map(poiItem => (
				<div
					className={cs(
						'table-geo__item table-geo-row',
						{
							'table-geo-row--visited': 'visited' in poiItem && poiItem.visited
						}
					)}
				>
					<div className="table-geo-row__title">
						{poiItem.title}
						<div className="table-geo-row__coord">
							{poiItem.coord.join(', ')}
						</div>
					</div>
					<div className="table-geo-row__country">
						{'country' in poiItem ? poiItem.country : 'Россия'}
					</div>
					{'description' in poiItem && (
						<div className="table-geo-row__description">
							{poiItem.description}
						</div>
					)}
					{'population' in poiItem && (
						<div className="table-geo-row__population">
							{poiItem.population}
						</div>
					)}
					<div className="table-geo-row__type">
						{poiItem.type}
					</div>
				</div>
			))}
		</div>
	</div>
)
