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
	// TODO: проверить где useRoute, что там всегда DEFAULT_ID
	const { params: { id = DEFAULT_ID } } = useRoute()
	// TODO: [HARD] из-за возвращаемого null очень много кода добавилось, бесполезного, это проверяется EmptyData
	const[ libraryItem ] = useApi<LibraryType>(API_ROUTE.libSingle({ id }))

	return (
		<Layout title="Библиотека" className="lib-page">
			<LibraryHeader />
			<LoadSuspense data={libraryItem}>
				<EmptyData data={libraryItem} skipEmpty>
					<LibraryForm
						key={libraryItem.data?.id ?? DEFAULT_ID}
						initialData={libraryItem.data}
					/>
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}

