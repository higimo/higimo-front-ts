import { ClassNameType } from 'utils.type'
import { FunctionComponent, h } from 'preact'

import cs from 'classnames'

import './style.css'

type HeadingLevel = 1 | 2 | 3 | 4

type HeadingPropsType = ClassNameType & {
	variant: 'intro' | 'typographic' | 'vk' | 'tourism'
	level?: HeadingLevel
}

export const Heading: FunctionComponent<HeadingPropsType> = ({
	variant,
	level = 1,
	className,
	children,
}) => {
	return h(
		`h${level}`,
		{
			className: cs(
				{
					'vk-heading': variant === 'vk',
					'intro-header': variant === 'intro',
					'tourism__header': variant === 'tourism',
					'typographic-header': variant === 'typographic'
				},
				className
			)
		},
		children,
	)
}
