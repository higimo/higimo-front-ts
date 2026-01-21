import { FunctionComponent } from 'preact'
import { Tag } from 'components/ui/tag'

const FILTER_OPTIONS = [
	{ key: 'new', label: 'нью' },
	{ key: 'pop', label: 'популярно' },
	{ key: 'liric', label: 'лирика' },
	{ key: 'scream', label: 'поорать' },
	{ key: 'korol', label: 'Король и шут' },
	{ key: 'funny', label: 'смешное' },
	{ key: 'rap', label: 'речитатив' },
	{ key: 'old', label: 'старинное' },
	{ key: 'ussr', label: 'СССР' },
	{ key: 'lacky', label: 'зайдёт' },
	{ key: 'newschool', label: 'ньюскул' },
	{ key: 'bard', label: 'барды' },
	{ key: 'noList', label: 'Без списков' },
	{ key: 'manyList', label: 'во многих списках' },
]

type AccordTagGalleryPropsType = {
	handleFilter: (string) => () => void
	filter: string
}
export const AccordTagGallery: FunctionComponent<AccordTagGalleryPropsType> = ({ handleFilter, filter }) => {
	return (
		<div>
			{FILTER_OPTIONS.map(({ key, label }) => (
				<Tag
					key={key}
					active={filter === key}
					onClick={handleFilter(key)}
				>
					{label}
				</Tag>
			))}
			{!!filter.length && [' ', <Tag onClick={handleFilter('')}>скинуть</Tag>]}
		</div>
	)
}