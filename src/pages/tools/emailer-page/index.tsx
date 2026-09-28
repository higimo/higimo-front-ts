import { FunctionComponent } from 'preact'

import { Emailer } from 'components/tool/emailer'
import { Layout } from 'components/ui/layout/Layout'

export const EmailerPage: FunctionComponent = () => (
	<Layout title="Эмайлер">
		<div className="tool-index-page">
			<Emailer />
		</div>
	</Layout>
)
