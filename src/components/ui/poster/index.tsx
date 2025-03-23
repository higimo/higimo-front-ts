import cs from 'classnames'

import './style.css'

export const Poster = props => (
	<div className={cs('poster', props.className)}>{props.children}</div>
)
