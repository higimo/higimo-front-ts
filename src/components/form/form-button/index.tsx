import { FunctionComponent } from 'preact'

import cs from 'classnames'

import '../form-style.css'

type FormButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary'

type FormButtonPropsType = {
	type?: 'submit' | 'reset' | 'button'
	variant?: FormButtonVariant
	disabled?: boolean
	onClick?: () => void
}

export const FormButton: FunctionComponent<FormButtonPropsType> = ({
	type = 'button',
	variant = 'default',
	disabled = false,
	onClick,
	children,
}) => (
	<button
		className={cs('my-button', `my-button--${variant}`)}
		type={type}
		onClick={onClick}
		disabled={disabled}
	>
		{children}
	</button>
)
