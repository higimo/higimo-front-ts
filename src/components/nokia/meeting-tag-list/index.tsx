import { FunctionComponent } from 'preact'
import { NokiaTagType } from 'api-types/nokia.types'

import { NokiaTag } from 'components/nokia/nokia-tag'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type MeetingTagListPropsType = {
	tags: NokiaTagType[]
	selectedTag?: NokiaTagType
	onClick: (tag: NokiaTagType) => () => void
}

export const MeetingTagList: FunctionComponent<MeetingTagListPropsType> = ({
	tags,
	selectedTag,
	onClick,
}) => (
	<div className="nokia__meeting-tags">
		{tags.map(tag => (
			<NokiaTag
				tag={tag}
				isActive={selectedTag && selectedTag.name === tag.name}
				onClick={onClick(tag)}
			/>
		))}
	</div>
)
