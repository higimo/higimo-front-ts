import { FunctionComponent } from 'preact'

import '../form-style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const FieldRow: FunctionComponent = (props) => (
	<div className="field-row">
		{props.children}
	</div>
)
