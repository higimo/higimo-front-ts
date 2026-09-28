import { FunctionComponent } from 'preact'

import { Layout } from 'components/ui/layout/Layout'
import { LibraryAdmin } from 'components/data/library/library-admin'
import { LibraryHeader } from 'components/data/library/library-header'

// const DEFAULT_ID = '-1'

export const LibAdminPage: FunctionComponent = () => {
	// TODO: [BACKEND] на бэке пока не реализовано
	// const { params: { id = DEFAULT_ID } } = useRoute()
	// const[ librarySingle ] = useApi<LibraryType | EmptyObject>(API_ROUTE.libSingle({ id }))

	return (
		<Layout title="Библиотека">
			<div className="lib-page">
				<LibraryHeader />
				<LibraryAdmin />
			</div>
		</Layout>
	)
}
