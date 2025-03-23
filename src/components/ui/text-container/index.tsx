import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TextContainerPropsType = {
	className?: string;
}
export const TextContainer: FunctionComponent<TextContainerPropsType> = props => (
	<div className={cs('text-container', props.className)}>{props.children}</div>
)
