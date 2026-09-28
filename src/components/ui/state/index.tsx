import { FunctionComponent, VNode } from 'preact'

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
	<div className={`state${variant === 'error' ? ' state--error' : ''}`}>
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

type EmptyCreateStatePropsType = Partial<StatePropsBaseType>

export const EmptyCreateState: FunctionComponent<EmptyCreateStatePropsType> = (props) => (
	<State
		title="Данных нет"
		text="...Самое время это исправить"
		action={<a className="state__button" href="#">Создать</a>}
		{...props}
	/>
)

type LoadingStatePropsType = Partial<StatePropsBaseType>

export const LoadingState: FunctionComponent<LoadingStatePropsType> = (props) => (
	<State
		icon={<div className="state__spinner" />}
		title="Загрузка"
		text="Подождите, данные загружаются"
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
