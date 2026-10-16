import { FunctionComponent } from 'preact'
import { NokiaTagGroupType, NokiaTagType } from 'api-types/nokia.types'

import { NokiaTag } from 'components/nokia/nokia-tag'

import './style.css'

type NokiaTagListPropsType = {
	tagGroupList: NokiaTagGroupType[] | null
	tagList: NokiaTagType[] | null
	filter: NokiaTagType['id'] | null
	updateFilter: (tag: NokiaTagType["id"]) => () => void
}

export const NokiaTagList: FunctionComponent<NokiaTagListPropsType> = ({
	tagGroupList: tagGroupList,
	tagList: tagList,
	filter,
	updateFilter,
}) => tagGroupList && tagList && (
	<div className="nokia-tags-gallery">
		{tagGroupList.map((tagGroup, key) => (
			<div key={key} className="nokia-tags-gallery__group">
				<div className="nokia-tags-gallery__group-name">
					{tagGroup}
				</div>
				<div className="nokia-tags-gallery__group-tags">
					{tagList.filter(i => i.group === tagGroup).map(tag => (
						<NokiaTag
							key={tag.id}
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
