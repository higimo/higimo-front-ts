import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { LibraryAdmin } from 'components/data/library/library-admin'
import { LibraryHeader } from 'components/data/library/library-header'
import { useRoute } from 'preact-iso'
import { LibraryType } from 'api-types/library.types'
import { API_ROUTE } from 'dic/API_ROUTE'
import { useApi } from 'hook/fetch/use-api'
import { EmptyObject } from 'utils.type'
import { LoadSuspense } from 'components/ui/load-suspense'
import { EmptyData } from 'components/ui/empty-data'

// TODO: [LIGHT] вынести в общую константу, в конфиг
const DEFAULT_ID = '-1'

export const LibAdminPage: FunctionComponent = () => {
	// TODO: [BACKEND] на бэке пока не реализовано
	const { params: { id = DEFAULT_ID } } = useRoute()
	const[ librarySingle ] = useApi<LibraryType | EmptyObject>(API_ROUTE.libSingle({ id }))

	return (
		<Layout title="Библиотека" className="lib-page">
			<LibraryHeader />
			<LoadSuspense data={librarySingle}>
				<EmptyData data={librarySingle} skipEmpty>
					<LibraryAdmin {...librarySingle.data} />
				</EmptyData>
			</LoadSuspense>
		</Layout>
	)
}
