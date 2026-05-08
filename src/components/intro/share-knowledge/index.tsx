import { FunctionComponent } from 'preact'

import cs from 'classnames'

import { TilesGallery } from 'components/ui/tiles-gallery/tiles-gallery'
import { TileElement } from 'components/ui/tile-element/tile-element'

import screen	from './img/screen.png'
import rak	   from './img/rak.png'
import tech	  from './img/tech.png'
import school	from './img/school.png'
import obuchenie from './img/obuchenie.png'
import intersection from './img/intersection.svg'

import { KnowlageType, shareKnowledgeData } from './data'

import './style.css'

const imageMapping: Record<KnowlageType['imgId'], string> = {
	screen,
	rak,
	tech,
	school,
	obuchenie,
	intersection,
}

const HALF_LIST = Math.round(shareKnowledgeData.length / 2)

const TileElementCon: FunctionComponent<KnowlageType> = ({ isArchive, link, imgId, name, description }) => (
	<TileElement
		className={cs(
			'share-knowledge__element',
			// TODO: переименовать в archive?
			{ 'share-knowledge__element--inactive': isArchive }
		)}
		isInactive={isArchive}
		href={link}
		image={<img className="tile-element__img" src={imageMapping[imgId]} />}
		name={name}
		description={description}
	/>
)

export const ShareKnowledge = () => (
	<TilesGallery
		className="share-knowledge"
		title="Делюсь знаниями"
		left={shareKnowledgeData.slice(0, HALF_LIST).map((item: KnowlageType) => (
			<TileElementCon key={item.name} {...item} />
		))}
		right={shareKnowledgeData.slice(HALF_LIST, shareKnowledgeData.length).map((item: KnowlageType) => (
			<TileElementCon key={item.name} {...item} />
		))}
	/>
)
