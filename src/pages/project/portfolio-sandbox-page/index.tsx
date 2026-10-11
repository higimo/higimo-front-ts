import { FunctionComponent } from 'preact'

import { PortfolioSandbox } from 'components/project/portfolio-sandbox'
import { Layout } from 'components/ui/layout/Layout'

export const PortfolioSandboxPage: FunctionComponent = () => (
	<Layout title="Тестовая страница">
		<PortfolioSandbox />
	</Layout>
)
