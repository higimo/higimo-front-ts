import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { LibraryHeader } from 'components/data/library/library-header'
import { LibraryAdmin } from 'components/data/library/library-admin'

export const LibAdminPage: FunctionComponent = () => {
	usePageTitle('Библиотека')

	return (
		<div className="lib-page">
			<LibraryHeader />
			<LibraryAdmin />
		</div>
	)
}
