import cs from 'classnames'
import { FunctionComponent } from 'preact'

import './style.css'

// TODO: [HIGH] добавить в UI-kit storybook
type PosterPropsType = {
	className?: string
}

export const Poster: FunctionComponent<PosterPropsType> = props => (
	<div className={cs('poster', props.className)}>{props.children}</div>
)
