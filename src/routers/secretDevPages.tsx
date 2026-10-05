import { PrivateRoute } from 'components/util/private-route'
import { Route } from 'preact-iso'

import { PortfolioSandboxPage } from 'pages/project/portfolio-sandbox'
import { ProjectTablePage } from 'pages/project/project-table-page'
import { ProjectTypographyPage } from 'pages/project/project-typography'
import { TypoPage } from 'pages/admin/typo-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Секретные разработки не для продакшена
export const secretDevPages = import.meta.env.DEV ?
	[
		<Route path={ROUTE_LINKS.typo} component={TypoPage} />,
		<Route path={ROUTE_LINKS.projectTypography} component={ProjectTypographyPage} />,
		<Route path={ROUTE_LINKS.projectSandbox} component={PortfolioSandboxPage} />,
		<PrivateRoute path={ROUTE_LINKS.projectTable} component={ProjectTablePage} />,
	]
	: []
