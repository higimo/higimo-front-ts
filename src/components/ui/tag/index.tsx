import { JSX } from 'preact';
import { FunctionComponent } from 'preact'

import './style.css'

type TagPropsType = JSX.ObjectHTMLAttributes
export const Tag: FunctionComponent<TagPropsType> = ({children, ...props}) => (
	<span className="tag" {...props}>{children}</span>
)
