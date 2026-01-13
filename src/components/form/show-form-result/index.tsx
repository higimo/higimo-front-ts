import { ComponentChildren, JSX } from 'preact';
import { HigimoServerResponse } from '../../../types';
import { Message } from '../../ui/message';

type ShowFormResultPropsType<T> = {
	status: HigimoServerResponse;
	reset: () => void;
	children?: ComponentChildren;
}
export const ShowFormResult = <T,>(props: ShowFormResultPropsType<T>): JSX.Element => {
	return (
		<div className="show-form-result">
			<Message result text={<>Результат: <pre>{JSON.stringify(props.status, null, '\t')}</pre></>} />
			<button onClick={() => props.reset()} className="default-form__submit">reset</button>
			{props.children}
		</div>
	)
}