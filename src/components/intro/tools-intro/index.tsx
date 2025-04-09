import { FunctionComponent } from 'preact'

import { TilesGallery } from '../../ui/tiles-gallery/tiles-gallery'
import { TileElement } from '../../ui/tile-element/tile-element'

import { ANCHOR_LINKS } from '../../../dic/ANCHOR_LINKS'

import { ToolDataType, toolListData } from './data'

import './style.css'
import { useAuth } from '../../../hook/use-auth'

const TileElementCon: FunctionComponent<ToolDataType> = props => (
	<TileElement
		className="tools-intro__item"
		isInactive={!props.link}
		href={props.link as string}
		name={props.name}
		description={props.description}
	/>
)

export const ToolsIntro: FunctionComponent = () => {
	const { isAuth } = useAuth()
	const toolList = toolListData.filter(toolItem => {
		return toolItem.isAdmin && isAuth || !toolItem.isAdmin
	})

	const HALF_LIST = Math.round(toolList.length / 2)

	return (
		<TilesGallery
			className="tools-intro"
			id={ANCHOR_LINKS.service}
			title="Сделал сервисов"
			left={toolList.slice(0, HALF_LIST).map(item => <TileElementCon {...item} />)}
			right={toolList.slice(HALF_LIST).map(item => <TileElementCon {...item} />)}
		/>
	)
}