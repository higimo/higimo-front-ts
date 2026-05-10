import { FunctionComponent } from 'preact'

import { Fragment } from 'preact/jsx-runtime'
import { TileElement } from 'components/ui/tile-element'

import { tourismExperimentMapsData } from './data'

import './style.css'
import { TextContainer } from 'components/ui/text-container'

const halfList = Math.ceil(tourismExperimentMapsData.length / 2)

export const TourismExperimentMaps: FunctionComponent = () => (
	<Fragment>
		<TextContainer>
			<h3>Эксперименты в Я.Картах</h3>
		</TextContainer>
		<div className="tourism-walk-gallery__list">
			<div className="tourism-walk-gallery__column">
				{tourismExperimentMapsData.slice(0, halfList).map(item => (
					<TileElement
						className="tourism-walk-gallery__item"
						href={item.href}
						name={item.title}
						description=""
					/>
				))}
			</div>
			<div className="tourism-walk-gallery__column">
				{tourismExperimentMapsData.slice(halfList).map(item => (
					<TileElement
						className="tourism-walk-gallery__item"
						href={item.href}
						name={item.title}
						description=""
					/>
				))}
			</div>
		</div>
	</Fragment>
)
