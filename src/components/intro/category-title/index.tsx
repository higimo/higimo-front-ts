import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

type CategoryTitlePropsType = {
	className?: string
}
export const CategoryTitle: FunctionComponent<CategoryTitlePropsType> = ({ children, className }) => (
	<h2 className={cs('category-title', className)}>{children}</h2>
)
