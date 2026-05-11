import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

// TODO: [LIGHT] добавить на типографскую страницу
type MetroTilePropsType = {
	className?: string
	href?: string
}
export const MetroTile: FunctionComponent<MetroTilePropsType> = props => (
	<div className={cs('metro-tile', props.className)}>{props.children}</div>
)
