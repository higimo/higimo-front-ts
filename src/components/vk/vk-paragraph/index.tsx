import { ClassNameType } from 'utils.type'
import { ComponentChildren, FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type VkParagraphVariant = 'primary' | 'secondary' | 'caption'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

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
