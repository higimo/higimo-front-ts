import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { LibraryBookItem } from 'components/data/library/library-book-item'

import './style.css'

type LibraryListPropsType = {
	books: LibraryType[]
	onRemove: (id: LibraryType['id']) => () => void
}

export const LibraryList: FunctionComponent<LibraryListPropsType> = ({
	books,
	onRemove,
}) => (
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
