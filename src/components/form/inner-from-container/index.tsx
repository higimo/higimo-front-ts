import { FunctionComponent } from 'preact'

import '../form-style.css'

// TODO: объединить контейнеры и сделать variant=""
export const InnerFromContainer: FunctionComponent = (props) => (
	<div className="inner-from-container">
		{props.children}
	</div>
)
