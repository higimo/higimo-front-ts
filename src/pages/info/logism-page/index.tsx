import { usePageTitle } from 'hook/use-page-title'

import { FunctionComponent } from 'preact'
import { LogismGallery } from 'components/logism/logism'

export const LogismPage: FunctionComponent = () => {
	usePageTitle('Логизмы')

	return <LogismGallery />
}
