import { FunctionComponent } from 'preact'

import { PronIndex } from 'components/info-service/pron'

export const PronPage: FunctionComponent = props => {
	document.title = 'pron'

	return <PronIndex />
}
