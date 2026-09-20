import { ClassNameType, IntroImageMappingType, IntroLinkDataType } from 'utils.type'
import { FunctionComponent } from 'preact'

import { IntoTile } from 'components/ui/into-tile'

import cs from 'classnames'

import './style.css'

type IntroTileGalleryPropsType = ClassNameType & {
	list: IntroLinkDataType[]
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
