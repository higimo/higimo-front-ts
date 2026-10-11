import { FunctionComponent } from 'preact'

import { Tag } from 'components/ui/tag/Tag'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type MeetingTagListPropsType = {
	tags: string[]
	selectedTags: string[]
	onClick: (newTagsList: string[]) => () => void
}

export const MeetingTagList: FunctionComponent<MeetingTagListPropsType> = ({
	tags,
	selectedTags,
	onClick,
}) => (
	<div className="nokia__meeting-tags">
		{tags.map(tag => (
			<Tag
				active={selectedTags.includes(tag)}
				onClick={onClick([tag])}
			>
				{tag}
			</Tag>
		))}
	</div>
)
