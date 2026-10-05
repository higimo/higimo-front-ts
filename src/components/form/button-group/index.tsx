import { FunctionComponent } from 'preact'

import cs from 'classnames'

import '../form-style.css'

type ButtonGroupPropsType = {
	variant?: 'slim' | 'gap'
}

export const ButtonGroup: FunctionComponent<ButtonGroupPropsType> = ({
	variant = 'vertical',
	children,
}) => {
	return (
		<div className={cs('button-group', {
			'button-group--slim': variant === 'slim',
			'button-group--gap': variant === 'gap',
		})}>
			{children}
		</div>
	)
}
