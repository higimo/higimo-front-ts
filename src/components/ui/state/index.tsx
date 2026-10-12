import { FunctionComponent, VNode } from 'preact'

import cs from 'classnames'

import './style.css'

type StatePropsBaseType = {
	title: string
	text: string
	icon: VNode
	action: VNode
	variant?: 'error'
}

type StatePropsType = Partial<StatePropsBaseType>

export const State: FunctionComponent<StatePropsType> = ({ title, text, icon, action, variant }) => (
	<div className={cs(
			'state',
			{ 'state--error': variant === 'error' }
		)}
	>
		{icon}
		<p className="state__title">{title}</p>
		<p className="state__text">{text}</p>
		{action && <div className="state__action">{action}</div>}
	</div>
)

type EmptyStatePropsType = Partial<StatePropsBaseType>

export const EmptyState: FunctionComponent<EmptyStatePropsType> = (props) => (
	<State
		title="Данных нет"
		text="Здесь пока ничего не появилось"
		{...props}
	/>
)

type ErrorStatePropsType = Partial<StatePropsBaseType>

export const ErrorState: FunctionComponent<ErrorStatePropsType> = (props) => (
	<State
		variant="error"
		title="Ошибка"
		text="Во время загрузки что-то пошло не так"
		{...props}
	/>
)
