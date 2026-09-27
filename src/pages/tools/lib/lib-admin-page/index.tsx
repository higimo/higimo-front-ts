import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { LibraryHeader } from 'components/data/library/library-header'
import { LibraryAdmin } from 'components/data/library/library-admin'

// const DEFAULT_ID = '-1'

export const LibAdminPage: FunctionComponent = () => {
	usePageTitle('Библиотека')

	// TODO: [BACKEND] на бэке пока не реализовано
	// const { params: { id = DEFAULT_ID } } = useRoute()
	// const[ librarySingle ] = useApi<LibraryType | EmptyObject>(API_ROUTE.libSingle({ id }))

	return (
		<div className="lib-page">
			<LibraryHeader />
			<LibraryAdmin />
		</div>
	)
}
