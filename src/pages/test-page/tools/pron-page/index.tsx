import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title';

import { PronIndex } from 'components/info-service/pron'

export const PronPage: FunctionComponent = props => {
	usePageTitle('pron')

	return <PronIndex />
}
