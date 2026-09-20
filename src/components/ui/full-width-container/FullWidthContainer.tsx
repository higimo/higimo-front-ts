import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type FullWidthContainerPropsType = {
	// TODO: [LIGHT] добавить общий тип с классом, чтоб не писать каждый раз
	className?: string
}

export const FullWidthContainer: FunctionComponent<FullWidthContainerPropsType> = props => (
	<div className={cs('full-width-container', props.className)}>
		{props.children}
	</div>
)

type FullWidthColumnPropsType = {
	className?: string
}

export const FullWidthColumn: FunctionComponent<FullWidthColumnPropsType> = props => (
	<div className={cs('full-width-column', props.className)}>
		{props.children}
	</div>
)
