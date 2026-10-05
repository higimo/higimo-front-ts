import { FunctionComponent } from 'preact'

import '../form-style.css'

export const FieldGroup: FunctionComponent = (props) => (
	<div className="field-group">
		{props.children}
	</div>
)
