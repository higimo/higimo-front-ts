import { ClassNameType, IntroImageMappingType, LinkDataType } from 'utils.type'
import { FunctionComponent } from 'preact'

import { IntoTile } from 'components/ui/into-tile'

import cs from 'classnames'

import './style.css'

type TileGalleryPropsType = ClassNameType & {
	list: LinkDataType[]
	imageMapping?: IntroImageMappingType
}

export const TileGallery: FunctionComponent<TileGalleryPropsType> = ({
	list,
	imageMapping,
	className,
}) => (
	<div className={cs('intro-tile', className)}>
		{list.map(item => (
			<IntoTile
				{...item}
				imageMapping={imageMapping}
			/>
		))}
	</div>
)
