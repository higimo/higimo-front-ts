import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { LibraryBookElement } from 'components/data/library/library-book-element'

import './style.css'

type LibraryGalleryPropsType = {
	books: LibraryType[]
	onRemove: (id: LibraryType['id']) => () => void
}

export const LibraryGallery: FunctionComponent<LibraryGalleryPropsType> = ({
	books,
	onRemove,
}) => (
	<div className="library-gallery">
		{books.map(book => (
			<LibraryBookElement
				key={book.id}
				onRemove={onRemove}
				{...book}
			/>
		))}
	</div>
)
