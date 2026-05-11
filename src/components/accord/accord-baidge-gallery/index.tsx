import { FunctionComponent } from 'preact'
import { Tag } from 'components/ui/tag'
import { ACCORD_TAG_CATEGORY } from 'components/accord/tags'
import { TagName } from 'hook/tags/use-smart-tags'

type AccordTagGalleryPropsType = {
	toggleTag: (label: TagName) => () => void
	isSelected: (label: TagName) => boolean
	deselectAll: () => void
}
export const AccordTagGallery: FunctionComponent<AccordTagGalleryPropsType> = ({ toggleTag, isSelected, deselectAll }) => (
	<div className="accord__tags-gallery">
		{ACCORD_TAG_CATEGORY[0].tags.map(({ label }, id) => (
			<Tag
				key={id}
				active={isSelected(label)}
				onClick={toggleTag(label)}
			>
				{label}
			</Tag>
		))}
		{'    '}
		<Tag onClick={deselectAll}>сбросить теги</Tag>
	</div>
)
