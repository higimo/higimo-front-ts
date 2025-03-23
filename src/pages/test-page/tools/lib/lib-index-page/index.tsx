import { FunctionComponent } from 'preact'

import { LibraryHeader } from '../../../../../components/library/library-header'
import { LibraryGallery } from '../../../../../components/library/library-gallery'

export const LibIndexPage: FunctionComponent = () => {
	document.title = 'Библиотека'

	return (
		<div className="lib-page">
			<LibraryHeader />
			<LibraryGallery />
		</div>
	)
}
