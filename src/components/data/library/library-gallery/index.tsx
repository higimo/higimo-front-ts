import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { LibraryBookElement } from 'components/data/library/library-book-element'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type LibraryGalleryPropsType = {
	books: LibraryType[] | null
	onRemove: (id: LibraryType['id']) => () => void
}

export const LibraryGallery: FunctionComponent<LibraryGalleryPropsType> = ({
	books,
	onRemove,
}) => books && (
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
