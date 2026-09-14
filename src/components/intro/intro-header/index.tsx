import { FunctionComponent } from 'preact'

import './style.css'

export const IntroHeader: FunctionComponent = ({ children }) => (
	<h2 className="intro-header">{children}</h2>
)
