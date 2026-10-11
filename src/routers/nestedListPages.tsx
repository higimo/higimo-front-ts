import { PrivateRoute } from 'components/util/private-route'
import { Redirect } from 'components/util/redirect'
import { Route } from 'preact-iso'

import { NestedListFormPage } from 'pages/tools/nested-list/nested-list-form-page'
import { NestedListListPage } from 'pages/tools/nested-list/nested-list-list-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Список списков
export const nestedListPages = [
	<PrivateRoute path={ROUTE_LINK.listListCreate} component={NestedListFormPage} />,
	<PrivateRoute path={ROUTE_LINK.listListEdit_CONST} component={NestedListFormPage} />,
	<Redirect path={ROUTE_LINK.listListDefault} to={ROUTE_LINK.listListMain} />,
	<Route path={ROUTE_LINK.listListDetail_CONST} component={NestedListListPage} />,
]
