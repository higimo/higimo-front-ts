import cs from 'classnames'
import { ComponentChild, FunctionComponent } from "preact";

type MessagePropsType = {
	text: ComponentChild;
	result?: boolean;
	message?: boolean;
	error?: boolean;
	success?: boolean;
}
export const Message: FunctionComponent<MessagePropsType> = ({ text, result, message, error, success }) => (
	<div className={cs('message', { result, message, error, success })}>
		{text}
	</div>
)