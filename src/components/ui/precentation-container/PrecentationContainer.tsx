import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type PrecentationContainerPropsType = ClassNameType & {
	id?: string
}

export const PrecentationContainer: FunctionComponent<PrecentationContainerPropsType> = (props) => (
	<div {...props} className={cs('precentation-container', props.className)}>
		{props.children}
	</div>
)
