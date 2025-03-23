import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

export const BAIDGE_COLOR = {
	yellow: 'yellow',
	green: 'green',
	gray: 'gray',
	blue: 'blue',
} as const
type ColorBadgeType = (typeof BAIDGE_COLOR)[keyof typeof BAIDGE_COLOR]

const preventDefault = null

type BaidgePropsType = {
	color: ColorBadgeType;
	onClick?: any;
}
export const Baidge: FunctionComponent<BaidgePropsType> = ({ color, onClick = preventDefault, children }) => (
	<span className={cs('baidge', {[`baidge--${color}`]: color})} onClick={onClick}>{children}</span>
)
