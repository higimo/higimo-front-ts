import { Route } from 'preact-iso'

import { IndexPage } from 'pages/index-page'
import { LastUpdatePage } from 'pages/last-update-page'
import { ServicePage } from 'pages/tools/service-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const indexPages = [
	<Route path={ROUTE_LINKS.index} component={IndexPage} />,
	<Route path={ROUTE_LINKS.serviceIndex} component={ServicePage} />,
	<Route path={ROUTE_LINKS.higimoBlog} component={LastUpdatePage} />,
]
