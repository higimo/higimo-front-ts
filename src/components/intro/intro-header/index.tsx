import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type IntroHeaderPropsType = ClassNameType

export const IntroHeader: FunctionComponent<IntroHeaderPropsType> = ({ children, className }) => (
	<h2 className={cs('intro-header', className)}>{children}</h2>
)
