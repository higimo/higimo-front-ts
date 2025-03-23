import { FunctionComponent } from 'preact'

import { TilesGallery } from '../../ui/tiles-gallery/tiles-gallery'
import { TileElement } from '../../ui/tile-element/tile-element';

import { aboutInviteList } from './data'

type AboutListType = {
	name: string;
	link: string;
	description: string;
}

import './style.css'

const halfList = 4

const TileElementCon: FunctionComponent<AboutListType> = (props) => (
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
		left={aboutInviteList.slice(0, halfList).map(item => (<TileElementCon {...item} />))}
		right={aboutInviteList.slice(halfList, aboutInviteList.length).map(item => (<TileElementCon {...item} />))}
	/>
)
