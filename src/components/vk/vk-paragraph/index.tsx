import { ComponentChildren, FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type VkParagraphVariant = 'primary' | 'secondary' | 'caption'

type VkParagraphPropsType = {
	variant?: VkParagraphVariant
	className?: string
	children: ComponentChildren | string
}

export const VkParagraph: FunctionComponent<VkParagraphPropsType> = ({
	variant = 'primary',
	className = '',
	children,
}) => (
	<p
		className={cs(
			'vk-paragraph',
			`vk-paragraph--${variant}`,
			className,
		)}
	>
		{children}
	</p>
)
