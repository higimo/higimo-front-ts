import { FunctionComponent } from 'preact'
import { LibraryBookType } from 'types'

export const LibraryBookElement: FunctionComponent<LibraryBookType> = (book) => {
	return (
		<div className="library-gallery__item">
			<div className="library-gallery__cover">
				<img className="library-gallery__img" src={book.img} loading="lazy" />
			</div>
			<div className="library-gallery__author">
				{book.author}
			</div>
			<div className="library-gallery__name">
				{book.name}
			</div>
			<div className="library-gallery__meta">
				<div className="library-gallery__addon">
					{book.addon}
				</div>
				<div className="library-gallery__isbn">
					{book.isbn}
				</div>
			</div>
			<div className="library-gallery__anons">
				{book.anons}
			</div>
		</div>
	)
}