import { usePageTitle } from 'hook/use-page-title';

import { FunctionComponent } from 'preact'
import { Logism } from 'components/logism/logism'

export const LogismPage: FunctionComponent = () => {
	usePageTitle('Логизмы')

	return <Logism />
}
