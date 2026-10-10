import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type TourismCustomListPropsType = ClassNameType

export const TourismCustomList: FunctionComponent<TourismCustomListPropsType> = ({ children, className }) => (
	<div className={cs('tourism-custom-list', className)}>
		{children}
	</div>
)
