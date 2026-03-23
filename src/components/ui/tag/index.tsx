import { JSX } from 'preact'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TagPropsType = JSX.ObjectHTMLAttributes & {
	active?: boolean
}

export const Tag: FunctionComponent<TagPropsType> = ({children, active = false, className, ...props}) => (
	<span
		className={cs(
			'tag',
			{ 'tag--active': active },
			{ 'tag--untouch': !props.onClick },
			className
		)}
		{...props}
	>
		{children}
	</span>
)
