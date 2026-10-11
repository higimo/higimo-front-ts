import { PrivateRoute } from 'components/util/private-route'
import { Route } from 'preact-iso'

import { AdminPage } from 'pages/admin/admin-page'
import { LoginPage } from 'pages/admin/login-page'
import { ToolPage } from 'pages/admin/tool-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// admin
export const adminPages = [
	<Route path={ROUTE_LINK.login} component={LoginPage} />,
	<PrivateRoute path={ROUTE_LINK.adminIndex} component={AdminPage} />,
	<PrivateRoute path="/admin/tool/:path?/:subpath?/:subsubpath?" component={ToolPage} />,
]
