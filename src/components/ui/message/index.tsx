import cs from 'classnames'
import { ComponentChild, FunctionComponent } from "preact";

import './style.css'

type MessagePropsType = {
	id?: string;
	text: ComponentChild | string;
	result?: boolean;
	message?: boolean;
	error?: boolean;
	success?: boolean;
}
export const Message: FunctionComponent<MessagePropsType> = ({ text, result, message, error, success }) => (
	<div className={cs('message', { result, message, error, success })}>
		{typeof text === 'string' ? (<span dangerouslySetInnerHTML={{ __html: text }} />) : text}
	</div>
)