import { PrivateRoute } from 'components/util/private-route'
import { Route } from 'preact-iso'

import { PortfolioSandboxPage } from 'pages/project/portfolio-sandbox-page'
import { ProjectTablePage } from 'pages/project/project-table-page'
import { ProjectTypographyPage } from 'pages/project/project-typography-page'
import { TypoPage } from 'pages/admin/typo-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Секретные разработки не для продакшена
export const secretDevPages = import.meta.env.DEV ?
	[
		<Route path={ROUTE_LINK.typo} component={TypoPage} />,
		<Route path={ROUTE_LINK.projectTypography} component={ProjectTypographyPage} />,
		<Route path={ROUTE_LINK.projectSandbox} component={PortfolioSandboxPage} />,
		<PrivateRoute path={ROUTE_LINK.projectTable} component={ProjectTablePage} />,
	]
	: []
