import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { LibraryItem } from 'components/data/library/library-item'

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
			<LibraryItem
				key={book.id}
				onRemove={onRemove}
				{...book}
			/>
		))}
	</div>
)
