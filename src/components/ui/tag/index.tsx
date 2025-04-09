import { JSX } from 'preact';
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TagPropsType = JSX.ObjectHTMLAttributes & {
	active?: boolean;
}

export const Tag: FunctionComponent<TagPropsType> = ({children, active = false, ...props}) => (
	<span
		className={cs('tag', { 'tag--active': active })}
		{...props}
	>
		{children}
	</span>
)
