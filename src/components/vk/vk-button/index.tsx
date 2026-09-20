import { ClassNameType } from 'utils.type'
import { ComponentChildren, FunctionComponent, TargetedMouseEvent } from 'preact'

import cs from 'classnames'

import './style.css'

type VkButtonVariant = 'primary' | 'secondary' | 'tertiary'
type VkButtonSize = 's' | 'm' | 'l'

type VkButtonPropsType = ClassNameType & {
	variant?: VkButtonVariant
	size?: VkButtonSize
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	stretched?: boolean
	onClick?: (event: TargetedMouseEvent<HTMLButtonElement>) => void
	children: ComponentChildren | string
}

export const VkButton: FunctionComponent<VkButtonPropsType> = ({
	variant = 'secondary',
	size = 'm',
	type = 'button',
	disabled = false,
	stretched = false,
	className = '',
	onClick,
	children,
}) => (
	<button
		className={cs(
			'vk-button',
			`vk-button--${variant}`,
			`vk-button--${size}`,
			{
				'vk-button--stretched': stretched,
			},
			className,
		)}
		type={type}
		disabled={disabled}
		onClick={onClick}
	>
		<span className="vk-button__content">{children}</span>
	</button>
)
