import { Tag } from 'components/ui/tag/Tag'
import { FunctionComponent } from 'preact'

type MeetingTagsPropsType = {
	tags: string[]
	selectedTags: string[]
	onClick: (newTagsList: string[]) => () => void
}

export const MeetingTags: FunctionComponent<MeetingTagsPropsType> = ({
	tags, selectedTags, onClick,
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
