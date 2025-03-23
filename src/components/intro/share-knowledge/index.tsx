import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { TilesGallery } from '../../ui/tiles-gallery/tiles-gallery'
import { TileElement } from '../../ui/tile-element/tile-element'

import screen    from './img/screen.png'
import rak       from './img/rak.png'
import tech      from './img/tech.png'
import school    from './img/school.png'
import obuchenie from './img/obuchenie.png'

import { shareKnowledgeData } from './data'

import './style.css'

type KnowlageType = {
	isArchive?: boolean;
	link?: string;
	imgId: 'screen' | 'rak' | 'tech' | 'school' | 'obuchenie';
	title: string;
	description: string;
}

const imageMapping: Record<KnowlageType['imgId'], string> = {
	screen,
	rak,
	tech,
	school,
	obuchenie,
}

const halfList = Math.round(shareKnowledgeData.length / 2)

type TileElementConProps = KnowlageType
const TileElementCon: FunctionComponent<TileElementConProps> = ({ isArchive, link, imgId, title, description }) => (
	<TileElement
		className={cs(
			'share-knowledge__element',
			{ 'share-knowledge__element--inactive': isArchive }
		)}
		isInactive={isArchive}
		href={link}
		image={<img className="tile-element__img" src={imageMapping[imgId]} />}
		name={title}
		description={description}
	/>
)

export const ShareKnowledge = () => (
	<TilesGallery
		className="share-knowledge"
		title="Делюсь знаниями"
		left={shareKnowledgeData.slice(0, halfList).map((item: KnowlageType) => (
			<TileElementCon key={item.title} {...item} />
		))}
		right={shareKnowledgeData.slice(halfList, shareKnowledgeData.length).map((item: KnowlageType) => (
			<TileElementCon key={item.title} {...item} />
		))}
	/>
)
