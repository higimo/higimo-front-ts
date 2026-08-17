import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type TourismCustomListPropsType = {
	className?: string
}

export const TourismCustomList: FunctionComponent<TourismCustomListPropsType> = ({ children, className }) => (
	<div className={cs('tourism-custom-list', className)}>
		{children}
	</div>
)
