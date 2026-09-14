import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/browser/use-page-title'

import { Emailer } from 'components/tool/emailer'

export const EmailerPage: FunctionComponent = () => {
	usePageTitle('Эмайлер')

	return (
		<div className="tool-index-page">
			<Emailer />
		</div>
	)
}
