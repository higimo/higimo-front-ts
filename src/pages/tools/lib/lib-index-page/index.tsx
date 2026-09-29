import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LibraryGallery } from 'components/data/library/library-gallery'
import { LibraryHeader } from 'components/data/library/library-header'
import { LoadSuspense } from 'components/ui/load-suspense'

import { libApi } from 'repositories/lib-api.repository'

import { API_ROUTE } from 'dic/API_ROUTE'

const onRemove = (id: LibraryType['id']) => () => {
	libApi.delete(id)
}

export const LibIndexPage: FunctionComponent = () => {
	const [ bookList ] = useApi<LibraryType[]>(API_ROUTE.lib)

	return (
		<Layout title="Библиотека" className="lib-page">
			<LibraryHeader />

			<LoadSuspense data={bookList}>
				<EmptyData data={bookList}>
					<LibraryGallery
						books={bookList.data}
						onRemove={onRemove}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
