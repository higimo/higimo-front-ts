import { FunctionComponent } from 'preact'

import { TilesGallery } from 'components/ui/tiles-gallery/tiles-gallery'
import { TileElement } from 'components/ui/tile-element/tile-element';

import { FunnyDataType, funnyList } from './data'

import './style.css'

const HALF_LIST = Math.round(funnyList.length / 2)

const TileElementCon: FunctionComponent<FunnyDataType> = (props) => (
	<TileElement
		className="about-invite__item"
		isInactive={!props.link}
		href={props.link}
		name={props.name}
		description={props.description}
	/>
)

export const FunnyIntro: FunctionComponent = () => (
	<TilesGallery
		className="about-invite"
		title="Поиграть"
		left={funnyList.slice(0, HALF_LIST).map(item => (<TileElementCon {...item} />))}
		right={funnyList.slice(HALF_LIST, funnyList.length).map(item => (<TileElementCon {...item} />))}
	/>
)
