import { FunctionComponent } from 'preact'

import '../form-style.css'

// TODO: [MIDDLE] как будто не надо это никому, или горизонтально сделать
export const FieldGroup: FunctionComponent = (props) => (
	<div className="field-group">
		{props.children}
	</div>
)
