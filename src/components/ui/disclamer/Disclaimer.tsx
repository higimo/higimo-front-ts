import { FunctionComponent } from 'preact'

import './style.css'

type DisclamerPropsType = {
	config: {
		data: any
	}
}

export const Disclamer: FunctionComponent<DisclamerPropsType> = ({ config: { data } }) => (
	<div className="disclaimer" dangerouslySetInnerHTML={{__html: data}} />
)
