import { FunctionComponent } from 'preact'
import { LibraryBookType } from 'components/data/library/types'

import { LibraryBookElement } from 'components/data/library/library-book-element'

import './style.css'

type LibraryGalleryPropsType = {
	books: LibraryBookType[]
}

export const LibraryGallery: FunctionComponent<LibraryGalleryPropsType> = ({ books }) => (
	<div className="library-gallery">
		{books.map(book => (
			<LibraryBookElement key={book.id} {...book} />
		))}
	</div>
)
