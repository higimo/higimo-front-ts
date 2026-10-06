import { FunctionComponent } from 'preact'

import { useApi } from 'hook/fetch/use-api'
import { useRoute } from 'preact-iso'

import { EmptyData } from 'components/ui/empty-data'
import { Layout } from 'components/ui/layout/Layout'
import { LibraryForm } from 'components/data/library/library-form'
import { LibraryHeader } from 'components/data/library/library-header'
import { LibraryType } from 'api-types/library.types'
import { LoadSuspense } from 'components/ui/load-suspense'

import { API_ROUTE } from 'dic/API_ROUTE'
import { DEFAULT_ID } from 'config/DEFAULT-ID'

export const LibFromPage: FunctionComponent = () => {
	// TODO: [BACKEND] на бэке пока не реализовано
	const { params: { id = DEFAULT_ID } } = useRoute()
	// TODO: [MIDDLE] пора поменять эти Single в роутах, словарях и переменных
	const[ librarySingle ] = useApi<LibraryType>(API_ROUTE.libSingle({ id }))

	return (
		<Layout title="Библиотека" className="lib-page">
			<LibraryHeader />
			<LoadSuspense data={librarySingle}>
				<EmptyData data={librarySingle} skipEmpty>
					<LibraryForm
						key={librarySingle.data?.id ?? DEFAULT_ID}
						initialData={librarySingle.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
