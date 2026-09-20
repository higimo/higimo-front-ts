import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TextContainerPropsType = ClassNameType & {
	style?: any
}

export const TextContainer: FunctionComponent<TextContainerPropsType> = props => (
	<div className={cs('text-container', props.className)} style={props.style}>{props.children}</div>
)
