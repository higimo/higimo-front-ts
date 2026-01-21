import { FunctionComponent } from 'preact'

import { TilesGallery } from 'components/ui/tiles-gallery/tiles-gallery'
import { TileElement } from 'components/ui/tile-element/tile-element'

import { AboutDataType, aboutInviteList } from 'components/intro/about-invite/data'

import './style.css'

const HALF_LIST = Math.round(aboutInviteList.length / 2)

const TileElementCon: FunctionComponent<AboutDataType> = (props) => (
	<TileElement
		className="about-invite__item"
		isInactive={!props.link}
		href={props.link}
		name={props.name}
		description={props.description}
	/>
)

export const AboutInvite: FunctionComponent = () => (
	<TilesGallery
		className="about-invite"
		title="Храню знания"
		left={aboutInviteList.slice(0, HALF_LIST).map(item => (<TileElementCon {...item} />))}
		right={aboutInviteList.slice(HALF_LIST).map(item => (<TileElementCon {...item} />))}
	/>
)
