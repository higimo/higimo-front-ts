import { ComponentChildren, FunctionComponent } from 'preact'
import { HigimoServerResponse } from 'api-types/server-response.types'

import { Message } from 'components/ui/message'

import '../form-style.css'

type ShowFormResultPropsType = {
	status: HigimoServerResponse
	reset: () => void
	children?: ComponentChildren
}

export const ShowFormResult: FunctionComponent<ShowFormResultPropsType> = (props) => (
	<div className="show-form-result">
		<Message result text={<>Результат: <pre>{JSON.stringify(props.status, null, '\t')}</pre></>} />
		<button onClick={props.reset} className="default-form__submit">reset</button>
		{props.children}
	</div>
)
