import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

// TODO: [HIGH] добавить в UI-kit storybook
type PosterPropsType = ClassNameType

export const Poster: FunctionComponent<PosterPropsType> = props => (
	<div className={cs('poster', props.className)}>{props.children}</div>
)
