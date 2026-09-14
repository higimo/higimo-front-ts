import { FunctionComponent } from 'preact'
import { IntroImageMappingType, ToolDataType } from 'utils.type'

import { IntoTile } from 'components/intro/into-tile'

import cs from 'classnames'

import './style.css'

type IntroTileGalleryPropsType = {
	list: ToolDataType[]
	className?: string
	imageMapping?: IntroImageMappingType
}

export const IntroTileGallery: FunctionComponent<IntroTileGalleryPropsType> = ({
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
