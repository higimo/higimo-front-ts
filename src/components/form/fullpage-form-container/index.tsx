import { FunctionComponent } from 'preact'

import '../form-style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

export const FullpageFormContainer: FunctionComponent = (props) => (
	<div className="fullpage-form-container">
		{props.children}
	</div>
)
