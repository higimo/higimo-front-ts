import { FunctionComponent } from 'preact'
import { BarPovType } from 'components/tourism/tourism-maps-figure/data/bar-pov-moscow'

import cs from 'classnames'

import { Tag } from 'components/ui/tag'

import './style.css'

// TODO: показывать описание попизже
// TODO: по клику на карточку бы фильтровать только его на карте
export const TourismBarPointSnippet: FunctionComponent<BarPovType> = (mapPoint) => (
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
		<div className="bar-pov__tags">{mapPoint.tags.map(item => (<Tag>{item}</Tag>))}</div>
		{!!mapPoint?.description?.length && (
			<div className="bar-pov__description">{mapPoint.description}</div>
		)}
	</div>
)
