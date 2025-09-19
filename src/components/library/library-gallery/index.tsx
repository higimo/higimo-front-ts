import { FunctionComponent } from 'preact'

import useApi, { API_STATUS } from 'hook/use-api'

import { Loading } from 'components/ui/loading'
import { NotFoundData } from 'components/ui/not-found-data'


import './style.css'
import { LibraryBookType } from '../types'
import { API_ROUTE } from 'dic/api-route'
import { LibraryBookElement } from '../library-book-element'

export const LibraryGallery: FunctionComponent = () => {
	const [ bookList ] = useApi<LibraryBookType>(API_ROUTE.lib)
		
	if ([API_STATUS.INIT, API_STATUS.LOADING].includes(bookList.status)) {
		return <Loading />
	}

	if (API_STATUS.LOADED === bookList.status && !bookList.data.length) {
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
