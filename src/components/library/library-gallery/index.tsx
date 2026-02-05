import { FunctionComponent } from 'preact'
import { LibraryBookType } from 'components/library/types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { LibraryBookElement } from 'components/library/library-book-element'
import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'

import { API_ROUTE } from 'dic/api-route'

import './style.css'

export const LibraryGallery: FunctionComponent = () => {
	const [ bookList ] = useApi<LibraryBookType[]>(API_ROUTE.lib)
	const isLoading = useLoadingState([bookList.status])
	const isListEmpty = useEmptyDataState(bookList.data)

	if (isLoading) {
		return <Loading />
	}

	if (isListEmpty) {
		return <NotFoundData />
	}

	return (
		<div className="library-gallery">
			{bookList.data.map(book => (
				<LibraryBookElement key={book.id} {...book} />
			))}
		</div>
	)
}
