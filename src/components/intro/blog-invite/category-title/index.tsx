import { FunctionComponent } from 'preact'

import './style.css'

export const CategoryTitle: FunctionComponent = ({ children }) => (
	<h2 className="category-title">{children}</h2>
)
