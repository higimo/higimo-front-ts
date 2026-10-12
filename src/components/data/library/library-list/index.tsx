import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { LibraryBookItem } from 'components/data/library/library-book-item'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type LibraryListPropsType = {
	books: LibraryType[] | null
	onRemove: (id: LibraryType['id']) => () => void
}

export const LibraryList: FunctionComponent<LibraryListPropsType> = ({
	books,
	onRemove,
}) => books && (
	<div className="library-gallery">
		{books.map(book => (
			<LibraryBookItem
				key={book.id}
				onRemove={onRemove}
				{...book}
			/>
		))}
	</div>
)
