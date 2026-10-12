import { FunctionComponent } from 'preact'

import { EmailerForm } from 'components/tool/emailer-form'
import { Layout } from 'components/ui/layout/Layout'

export const EmailerPage: FunctionComponent = () => (
	<Layout title="Эмайлер" className="tool-index-page">
		<EmailerForm />
	</Layout>
)
