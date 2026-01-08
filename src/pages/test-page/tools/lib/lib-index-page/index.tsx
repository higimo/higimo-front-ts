import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { LibraryHeader } from 'components/library/library-header'
import { LibraryGallery } from 'components/library/library-gallery'

export const LibIndexPage: FunctionComponent = () => {
	usePageTitle('Библиотека')

	return (
		<div className="lib-page">
			<LibraryHeader />
			<LibraryGallery />
		</div>
	)
}
