import { Route } from 'preact-iso'

import { ProjectListPage } from 'pages/project/project-list-page'
import { ProjectItemPage } from 'pages/project/project-item-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Портфолио
export const portfolioPages = [
	<Route path={ROUTE_LINK.projectIndex} component={ProjectListPage} />,
	<Route path={ROUTE_LINK.projectDetail_CONST} component={ProjectItemPage} />,
]
