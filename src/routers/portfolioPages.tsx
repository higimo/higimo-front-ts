import { Route } from 'preact-iso'

import { ProjectIndexPage } from 'pages/project/project-index-page'
import { ProjectSinglePage } from 'pages/project/project-single-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Портфолио
export const portfolioPages = [
	<Route path={ROUTE_LINKS.projectIndex} component={ProjectIndexPage} />,
	<Route path={ROUTE_LINKS.projectDetail_CONST} component={ProjectSinglePage} />,
]
