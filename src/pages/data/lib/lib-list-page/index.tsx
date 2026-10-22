import { FunctionComponent } from 'preact'
import { LibraryType } from 'api-types/library.types'

import { useApi } from 'hook/fetch/use-api'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LibraryList } from 'components/data/library/library-list'
import { LibraryHeader } from 'components/data/library/library-header'
import { LoadSuspense } from 'components/ui/load-suspense'

import { handleApiError } from 'utils/api/handle-errors/handle-api-error'
import { libApi } from 'repositories/lib-api.repository'
import { toast } from 'toast'

import { API_ROUTE } from 'dic/route/API_ROUTE'

const onRemove = (id: LibraryType['id']) => async () => {
	try {
		const res = await libApi.delete(id)
		if (!!res) {
			toast.success(`Удалён [${id}]`)
		}
	} catch (error) {
		handleApiError(error)
	}
}

export const LibListPage: FunctionComponent = () => {
	const [ bookList ] = useApi<LibraryType[]>(API_ROUTE.lib)

	return (
		<Layout title="Библиотека" className="lib-page">
			<LibraryHeader />

			<LoadSuspense data={bookList}>
				<EmptyData data={bookList}>
					<LibraryList
						books={bookList.data ?? []}
						onRemove={onRemove}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
