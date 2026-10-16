import { FunctionComponent } from 'preact'

import cs from 'classnames'

import '../form-style.css'

type FromContainerPropsType = {
	variant: 'inner' | 'full'
}

export const FromContainer: FunctionComponent<FromContainerPropsType> = (props) => (
	<div
		className={cs({
			'inner-from-container': props.variant === 'inner',
			'fullpage-form-container': props.variant === 'full',
		})}
	>
		{props.children}
	</div>
)
