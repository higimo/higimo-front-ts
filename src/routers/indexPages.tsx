import { Route } from 'preact-iso'

import { IndexPage } from 'pages/index-page'
import { BlogListPage } from 'pages/blog-list-page'
import { ServicePage } from 'pages/tools/service-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

export const indexPages = [
	<Route path={ROUTE_LINK.index} component={IndexPage} />,
	<Route path={ROUTE_LINK.serviceIndex} component={ServicePage} />,
	<Route path={ROUTE_LINK.higimoBlog} component={BlogListPage} />,
]
