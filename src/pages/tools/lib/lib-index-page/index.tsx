import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useApi } from 'hook/fetch/use-api'
import { useCallback } from 'preact/hooks'
import { useEmptyDataState } from 'hook/fetch/use-empty-data-state'
import { useLoadingState } from 'hook/fetch/use-loading-state'
import { usePageTitle } from 'hook/browser/use-page-title'

import { LibraryGallery } from 'components/data/library/library-gallery'
import { LibraryHeader } from 'components/data/library/library-header'
import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { libApi } from 'repositories/lib-api.repository'

import { API_ROUTE } from 'dic/API_ROUTE'

export const LibIndexPage: FunctionComponent = () => {
	usePageTitle('Библиотека')

	const [ bookList ] = useApi<LibraryType[]>(API_ROUTE.lib)
	const isLoading = useLoadingState([bookList.status])
	const isListEmpty = useEmptyDataState(bookList.data)

	const onRemove = useCallback((id: LibraryType['id']) => async () => {
		libApi.delete(id)
	}, [])

	if (isLoading) {
		return <Loading />
	}
	if (isListEmpty) {
		return <NotFoundPage />
	}

	return (
		<div className="lib-page">
			<LibraryHeader />

			<LibraryGallery
				books={bookList.data}
				onRemove={onRemove}
			/>
		</div>
	)
}
