import { FunctionComponent } from 'preact'

import '../form-style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className
// TODO: [ONE_CLASS_COMPONENT] объединить контейнеры и сделать variant=""
export const InnerFromContainer: FunctionComponent = (props) => (
	<div className="inner-from-container">
		{props.children}
	</div>
)
