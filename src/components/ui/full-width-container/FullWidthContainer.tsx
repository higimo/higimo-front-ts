import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type FullWidthContainerPropsType = ClassNameType

export const FullWidthContainer: FunctionComponent<FullWidthContainerPropsType> = props => (
	<div className={cs('full-width-container', props.className)}>
		{props.children}
	</div>
)

type FullWidthColumnPropsType = ClassNameType

export const FullWidthColumn: FunctionComponent<FullWidthColumnPropsType> = props => (
	<div className={cs('full-width-column', props.className)}>
		{props.children}
	</div>
)
