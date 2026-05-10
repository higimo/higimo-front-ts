import { FunctionComponent } from 'preact'
import { LibraryBookType } from 'components/library/types'

import { LibraryBookElement } from 'components/library/library-book-element'

import './style.css'

type LibraryGalleryPropsType = {
	books: LibraryBookType[]
}
export const LibraryGallery: FunctionComponent<LibraryGalleryPropsType> = ({ books }) => {
	return (
		<div className="library-gallery">
			{books.map(book => (
				<LibraryBookElement key={book.id} {...book} />
			))}
		</div>
	)
}
