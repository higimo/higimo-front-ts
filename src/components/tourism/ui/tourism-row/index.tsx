import { FunctionComponent } from 'preact'

import './style.css'

export const TourismRow: FunctionComponent = ({ children }) => (
	<div className="tourism-row">
		{children}
	</div>
)
