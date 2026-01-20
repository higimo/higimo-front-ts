import { FunctionComponent } from 'preact';
import { BarPovType } from 'components/tourism/tourism-maps-figure/data/bar-pov-moscow';

import { Tag } from 'components/ui/tag';

import './style.css'

export const TourismBarPointSnippet: FunctionComponent<BarPovType> = (mapPoint) => (
	<div className="bar-pov__snippet">
		<div className="bar-pov__title">{mapPoint.title}</div>
		<div className="bar-pov__meta">
			<div className="bar-pov__icon">Категория: {mapPoint.icon}</div>
			<div className="bar-pov__color">Качество: {mapPoint.color}</div>
		</div>
		<div className="bar-pov__adress">{mapPoint.adress}</div>
		<div className="bar-pov__description">{mapPoint.description}</div>
		<div className="bar-pov__tags">{mapPoint.tags.map(item => (<Tag>{item}</Tag>))}</div>
	</div>
)