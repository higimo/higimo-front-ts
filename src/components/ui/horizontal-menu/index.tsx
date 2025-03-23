import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type HorizontalMenuPropsType = { className?: string }
export const HorizontalMenu: FunctionComponent<HorizontalMenuPropsType> = ({className, children}) => (
	<div className={cs('horizontal-menu', className)}>
		{children}
	</div>
)

type HorizontalElementPropsType = { className?: string }
export const HorizontalElement: FunctionComponent<HorizontalElementPropsType> = ({className, children}) => (
	<div className={cs('horizontal-element', className)}>
		{children}
	</div>
)
