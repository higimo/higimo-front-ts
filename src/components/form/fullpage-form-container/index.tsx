import { FunctionComponent } from 'preact'

import '../form-style.css'

export const FullpageFormContainer: FunctionComponent = (props) => (
	<div className="fullpage-form-container">
		{props.children}
	</div>
)
