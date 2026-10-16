import { FunctionComponent } from 'preact'

import '../form-style.css'

// TODO: [MIDDLE] объединить контейнеры и сделать variant=""
export const InnerFromContainer: FunctionComponent = (props) => (
	<div className="inner-from-container">
		{props.children}
	</div>
)
