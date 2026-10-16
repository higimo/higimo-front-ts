import { ClassNameType } from 'utils.type'
import { ComponentChildren, FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type VkParagraphVariant = 'primary' | 'secondary' | 'caption'

type VkParagraphPropsType = ClassNameType & {
	variant?: VkParagraphVariant
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
