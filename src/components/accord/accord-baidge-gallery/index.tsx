import { FunctionComponent } from 'preact'
import { Tag } from 'components/ui/tag'
import { TOTAL_TAGS } from 'components/accord/tags'

type AccordTagGalleryPropsType = {
	handleFilter: (tagName: string) => () => void
	filter: string
}
export const AccordTagGallery: FunctionComponent<AccordTagGalleryPropsType> = ({ handleFilter, filter }) => (
	<div className="accord__tags-gallery">
		{Object.entries(TOTAL_TAGS).map(([ key, label ]) => (
			<Tag
				key={key}
				active={filter === label}
				onClick={handleFilter(label)}
			>
				{label}
			</Tag>
		))}
		{!!filter.length && [' ', <Tag onClick={handleFilter('')}>скинуть</Tag>]}
	</div>
)
