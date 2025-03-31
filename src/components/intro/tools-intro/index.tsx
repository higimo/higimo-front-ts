import { FunctionComponent } from 'preact'

import { TilesGallery } from '../../ui/tiles-gallery/tiles-gallery'
import { TileElement } from '../../ui/tile-element/tile-element'

import { ANCHOR_LINKS } from '../../../dic/ANCHOR_LINKS'

import { ToolDataType, toolListData } from './data'

import './style.css'

const HALF_LIST = Math.round(toolListData.length / 2)

const TileElementCon: FunctionComponent<ToolDataType> = props => (
	<TileElement
		className="tools-intro__item"
		isInactive={!props.link}
		href={props.link as string}
		name={props.name}
		description={props.description}
	/>
)

export const ToolsIntro: FunctionComponent = () => (
	<TilesGallery
		className="tools-intro"
		id={ANCHOR_LINKS.service}
		title="Сделал сервисов"
		left={toolListData.slice(0, HALF_LIST).map(item => <TileElementCon {...item} />)}
		right={toolListData.slice(HALF_LIST, toolListData.length).map(item => <TileElementCon {...item} />)}
	/>
)
