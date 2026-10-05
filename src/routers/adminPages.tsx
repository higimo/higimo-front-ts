import { PrivateRoute } from 'components/util/private-route'
import { Route } from 'preact-iso'

import { AdminPage } from 'pages/admin/admin-page'
import { LoginPage } from 'pages/auth/login-page'
import { ToolPage } from 'pages/admin/tool-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// admin
export const adminPages = [
	<Route path={ROUTE_LINKS.login} component={LoginPage} />,
	<PrivateRoute path={ROUTE_LINKS.adminIndex} component={AdminPage} />,
	<PrivateRoute path="/admin/tool/:path?/:subpath?/:subsubpath?" component={ToolPage} />,
]
