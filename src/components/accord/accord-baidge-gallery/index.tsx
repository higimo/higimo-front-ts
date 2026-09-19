import { FunctionComponent } from 'preact'
import { TagName } from 'types'

import { Tag } from 'components/ui/tag'

import { ACCORD_TAG_CATEGORY } from 'components/accord/tags'

type AccordTagGalleryPropsType = {
	toggleTag: (label: TagName) => () => void
	isSelected: (label: TagName) => boolean
}
export const AccordTagGallery: FunctionComponent<AccordTagGalleryPropsType> = ({ toggleTag, isSelected }) => (
	<div className="accord__tags-gallery">
		{ACCORD_TAG_CATEGORY[0].tags.map(({ title }, id) => (
			<Tag
				key={id}
				active={isSelected(title)}
				onClick={toggleTag(title)}
			>
				{title}
			</Tag>
		))}
	</div>
)
