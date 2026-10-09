import { FunctionComponent } from 'preact'

import '../form-style.css'

export const FieldRow: FunctionComponent = (props) => (
	<div className="field-row">
		{props.children}
	</div>
)
