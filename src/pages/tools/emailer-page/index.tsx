import { FunctionComponent } from 'preact'

import { EmailerForm } from 'components/tool/emailer'
import { Layout } from 'components/ui/layout/Layout'

export const EmailerPage: FunctionComponent = () => (
	<Layout title="Эмайлер" className="tool-index-page">
		<EmailerForm />
	</Layout>
)
