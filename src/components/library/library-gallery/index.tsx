import { LibraryBookType } from '../types'
import { FunctionComponent } from 'preact'

import useApi, { API_STATUS } from '../../../hook/use-api'

import { LibraryBookElement } from '../library-book-element'
import { Loading } from '../../accord/accord-single'
import { NotFoundData } from '../../ui/not-found-data'

import { API_ROUTE } from '../../../api-route'

import './style.css'

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
