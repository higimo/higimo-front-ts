import { FunctionComponent } from 'preact'

import '../form-style.css'

export const InnerFromContainer: FunctionComponent = (props) => (
	<div className="inner-from-container">
		{props.children}
	</div>
)
