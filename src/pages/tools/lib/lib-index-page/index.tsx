import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useApi } from 'hook/fetch/use-api'
import { useCallback } from 'preact/hooks'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LibraryGallery } from 'components/data/library/library-gallery'
import { LibraryHeader } from 'components/data/library/library-header'
import { LoadSuspense } from 'components/ui/load-suspense'

import { libApi } from 'repositories/lib-api.repository'

import { API_ROUTE } from 'dic/API_ROUTE'

export const LibIndexPage: FunctionComponent = () => {
	const [ bookList ] = useApi<LibraryType[]>(API_ROUTE.lib)

	// TODO: а тут точно обёртку надо?
	const onRemove = useCallback((id: LibraryType['id']) => async () => {
		libApi.delete(id)
	}, [])

	return (
		<Layout title="Библиотека">
			<div className="lib-page">
				<LibraryHeader />

				<LoadSuspense data={bookList}>
					<EmptyData data={bookList}>
						<LibraryGallery
							books={bookList.data}
							onRemove={onRemove}
						/>
					</EmptyData>
				</LoadSuspense>
			</div>
		</Layout>
	)
}
