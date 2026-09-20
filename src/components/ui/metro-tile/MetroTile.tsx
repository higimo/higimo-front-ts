import { ClassNameType } from 'utils.type'
import { FunctionComponent } from 'preact'

import cs from 'classnames'

import './style.css'

// TODO: [HIGH] добавить в UI-kit storybook
type MetroTilePropsType = ClassNameType & {
	href?: string
}

export const MetroTile: FunctionComponent<MetroTilePropsType> = props => (
	<div className={cs('metro-tile', props.className)}>{props.children}</div>
)
