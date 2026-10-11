import { FunctionComponent } from 'preact'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

import './style.css'

export const TourismBulletList: FunctionComponent = ({ children }) => (
	<div className="tourism-bullet-list">
		{children}
	</div>
)
