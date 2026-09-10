import { FunctionComponent } from 'preact'

import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'
import useApi from 'hook/fetch/use-api'

import { LibraryBookType } from 'components/library/types'
import { LibraryGallery } from 'components/library/library-gallery'
import { LibraryHeader } from 'components/library/library-header'
import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/API_ROUTE'

export const LibIndexPage: FunctionComponent = () => {
	usePageTitle('Библиотека')

	const [ bookList ] = useApi<LibraryBookType[]>(API_ROUTE.lib)
	const isLoading = useLoadingState([bookList.status])
	const isListEmpty = useEmptyDataState(bookList.data)

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="lib-page">
			<LibraryHeader />
			<LibraryGallery books={bookList.data} />
		</div>
	)
}
