import { FunctionComponent } from 'preact'

import './style.css'

export const TourismBulletList: FunctionComponent = ({ children }) => (
	<div className="tourism-bullet-list">
		{children}
	</div>
)
