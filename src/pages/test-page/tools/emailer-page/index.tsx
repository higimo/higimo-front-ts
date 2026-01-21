import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { Emailer } from 'components/emailer'

export const EmailerPage: FunctionComponent = () => {
	usePageTitle('Эмайлер')

	return (
		<div className="tool-index-page">
			<Emailer />
		</div>
	)
}
