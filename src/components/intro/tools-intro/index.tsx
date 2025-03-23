import { FunctionComponent } from 'preact'

import { TilesGallery } from '../../ui/tiles-gallery/tiles-gallery'
import { TileElement } from '../../ui/tile-element/tile-element'

import { ANCHOR_LINKS } from '../../../dic/ANCHOR_LINKS'

import { toolsData } from './data'

import './style.css'

type ToolsListType = {
	name: string;
	description: string;
	link?: string;
}

const halfList = 6

type TileElementConType = ToolsListType
const TileElementCon: FunctionComponent<TileElementConType> = props => (
	<TileElement
		className="tools-intro__item"
		isInactive={!props.link}
		href={props.link}
		name={props.name}
		description={props.description}
	/>
)

export const ToolsIntro: FunctionComponent = () => (
	<TilesGallery
		className="tools-intro"
		id={ANCHOR_LINKS.service}
		title="Сделал сервисов"
		left={toolsData.slice(0, halfList).map(item => <TileElementCon {...item} />)}
		right={toolsData.slice(halfList, toolsData.length).map(item => <TileElementCon {...item} />)}
	/>
)
