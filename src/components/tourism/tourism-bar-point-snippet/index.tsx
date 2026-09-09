import { BarPovRealTags } from 'components/tourism/types'
import { FunctionComponent } from 'preact'

import { Tag } from 'components/ui/tag'

import cs from 'classnames'

import './style.css'

export const TourismBarPointSnippet: FunctionComponent<BarPovRealTags> = (mapPoint) => (
	<div
		className={cs(
			'bar-pov__snippet',
			{ 'bar-pov__snippet--visited': mapPoint.color !== 'Не посещал' }
		)}
	>
		<div className="bar-pov__title">{mapPoint.title}</div>
		<div className="bar-pov__adress">{mapPoint.adress}</div>
		<div className="bar-pov__meta">
			<div className="bar-pov__icon">Категория: {mapPoint.icon}</div>
			<div className="bar-pov__color">Качество: {mapPoint.color}</div>
		</div>
		<div className="bar-pov__tags">{mapPoint.tags.map(item => (<Tag>{item.title}</Tag>))}</div>
		{!!mapPoint?.description?.length && (
			<div className="bar-pov__description">{mapPoint.description}</div>
		)}
	</div>
)
