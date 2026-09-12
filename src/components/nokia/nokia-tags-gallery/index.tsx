import { FunctionComponent } from 'preact'
import { NokiaTagGroupType, NokiaTagType } from 'api-types/nokia.types'

import { NokiaTag } from 'components/nokia/nokia-tag'

import './style.css'

type NokiaTagsGalleryPropsType = {
	tagGroups: NokiaTagGroupType[]
	tags: NokiaTagType[]
	filter: NokiaTagType['id'] | null
	updateFilter: (tag: NokiaTagType["id"]) => () => void
}
export const NokiaTagsGallery: FunctionComponent<NokiaTagsGalleryPropsType> = ({
	tagGroups,
	tags,
	filter,
	updateFilter,
}) => (
	<div className="nokia-tags-gallery">
		{tagGroups.map(tagGroup => (
			<div className="nokia-tags-gallery__group">
				<div className="nokia-tags-gallery__group-name">
					{tagGroup}
				</div>
				<div className="nokia-tags-gallery__group-tags">
					{tags.filter(i => i.group === tagGroup).map(tag => (
						<NokiaTag
							tag={tag}
							onClick={updateFilter(tag.id)}
							isActive={tag.id === filter}
						/>
					))}
				</div>
			</div>
		))}
	</div>
)
