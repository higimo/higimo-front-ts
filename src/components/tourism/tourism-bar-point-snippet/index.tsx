import { BarPoiRealTags } from 'api-types/tourism.types'
import { FunctionComponent } from 'preact'

import { Tag } from 'components/ui/tag'

import cs from 'classnames'

import './style.css'

export const TourismBarPointSnippet: FunctionComponent<BarPoiRealTags> = (mapPoint) => (
	<div
		className={cs(
			'bar-poi__snippet',
			{ 'bar-poi__snippet--visited': mapPoint.color !== 'Не посещал' }
		)}
	>
		<div className="bar-poi__info">
			<div className="bar-poi__adress">{mapPoint.adress}</div>
			<div className="bar-poi__meta">
				<div className="bar-poi__icon">Категория: {mapPoint.icon}</div>
				<div className="bar-poi__color">Качество: {mapPoint.color}</div>
			</div>
		</div>
		<div className="bar-poi__content">
			<div className="bar-poi__title">{mapPoint.title}</div>
			{!!mapPoint?.description?.length && (
				<div className="bar-poi__description">{mapPoint.description}</div>
			)}
			<div className="bar-poi__tags">{mapPoint.tags.map(item => (
				<Tag key={item.id}>{item.title}</Tag>
			))}</div>
		</div>
	</div>
)
