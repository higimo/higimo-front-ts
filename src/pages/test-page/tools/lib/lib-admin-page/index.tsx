import { FunctionComponent } from 'preact'

import { LibraryHeader } from '../../../../../components/library/library-header'
import { LibraryAdmin } from '../../../../../components/library/library-admin'

export const LibAdminPage: FunctionComponent = () => {
	document.title = 'Библиотека'

	return (
		<div className="lib-page">
			<LibraryHeader />
			<LibraryAdmin />
		</div>
	)
}
