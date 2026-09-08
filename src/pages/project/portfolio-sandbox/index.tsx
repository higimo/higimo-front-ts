import { FunctionComponent } from 'preact'

import { usePageTitle } from 'hook/use-page-title'

import { PortfolioSandbox } from 'components/project/portfolio-sandbox'

export const PortfolioSandboxPage: FunctionComponent = () => {
	usePageTitle('Тестовая страница')

	return (
		<PortfolioSandbox />
	)
}

export default PortfolioSandboxPage
