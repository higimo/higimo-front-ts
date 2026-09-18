import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type IntroHeaderPropsType = {
	className?: string
}

export const IntroHeader: FunctionComponent<IntroHeaderPropsType> = ({ children, className }) => (
	<h2 className={cs('intro-header', className)}>{children}</h2>
)
