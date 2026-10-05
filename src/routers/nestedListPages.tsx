import { PrivateRoute } from 'components/util/private-route'
import { Redirect } from 'components/util/redirect'
import { Route } from 'preact-iso'

import { ListListFormPage } from 'pages/tools/list-list/list-list-form-page'
import { ListListIndexPage } from 'pages/tools/list-list/list-list-index-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Список списков
export const nestedListPages = [
	<PrivateRoute path={ROUTE_LINKS.listListCreate} component={ListListFormPage} />,
	<Redirect path={ROUTE_LINKS.listListDefault} to={ROUTE_LINKS.listListMain} />,
	<Route path={ROUTE_LINKS.listListMain} component={ListListIndexPage} />,
	<Route path={ROUTE_LINKS.listListDetail_CONST} component={ListListIndexPage} />,
	<PrivateRoute path={ROUTE_LINKS.listListEdit_CONST} component={ListListFormPage} />,
]
