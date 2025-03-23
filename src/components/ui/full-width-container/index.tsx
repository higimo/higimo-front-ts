import cs from 'classnames'

import './style.css'

export const FullWidthContainer = props => (
	<div className={cs('full-width-container', props.className)}>
		{props.children}
	</div>
)

export const FullWidthColumn = props => (
	<div className={cs('full-width-column', props.className)}>
		{props.children}
	</div>
)
