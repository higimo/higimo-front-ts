import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type PrecentationContainerPropsType = {
	id?: string;
	className?: string;
}
export const PrecentationContainer: FunctionComponent<PrecentationContainerPropsType> = (props) => (
	<div {...props} className={cs('precentation-container', props.className)}>
		{props.children}
	</div>
)
