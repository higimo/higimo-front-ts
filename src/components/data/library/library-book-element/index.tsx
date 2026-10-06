import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'
import { OnlyAdmin } from 'components/util/only-admin'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type LibraryBookElementPropsType = LibraryType & {
	onRemove: (id: LibraryType['id']) => () => void
}

export const LibraryBookElement: FunctionComponent<LibraryBookElementPropsType> = (book) => (
	<div className="library-gallery__item">
		<OnlyAdmin>
			<div className="library-gallery__action-bar">
				<a href={ROUTE_LINKS.libraryFormEdit({ id: book.id })}>
					✏️
				</a>
				<span onClick={book.onRemove(book.id)}>
					❌
				</span>
			</div>
		</OnlyAdmin>
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
