import { FunctionComponent } from 'preact'

import { Emailer } from 'components/emailer'

export const EmailerPage: FunctionComponent = () => {
	document.title = 'Эмайлер'

	return (
		<div className="tool-index-page">
			<Emailer />
		</div>
	)
}
