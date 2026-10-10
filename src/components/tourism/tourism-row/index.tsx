import { FunctionComponent } from 'preact'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const TourismRow: FunctionComponent = ({ children }) => (
	<div className="tourism-row">
		{children}
	</div>
)
