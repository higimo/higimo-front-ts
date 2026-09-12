import { ComponentChildren, FunctionComponent, h } from 'preact'

import cs from 'classnames'

import './style.css'

type VkHeadingLevel = 1 | 2 | 3 | 4

type VkHeadingPropsType = {
	level?: VkHeadingLevel
	className?: string
	children: ComponentChildren | string
}

export const VkHeading: FunctionComponent<VkHeadingPropsType> = ({
	level = 1,
	className = '',
	children,
}) => h(
	`h${level}`,
	{
		className: cs(
			'vk-heading',
			`vk-heading--${level}`,
			className,
		)
	},
	children
)
