import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type HorizontalMenuPropsType = ClassNameType

export const HorizontalMenu: FunctionComponent<HorizontalMenuPropsType> = ({className, children}) => (
	<div className={cs('horizontal-menu', className)}>
		{children}
	</div>
)

type HorizontalElementPropsType = ClassNameType

export const HorizontalElement: FunctionComponent<HorizontalElementPropsType> = ({className, children}) => (
	<div className={cs('horizontal-element', className)}>
		{children}
	</div>
)
