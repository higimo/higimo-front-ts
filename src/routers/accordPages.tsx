import { Route } from 'preact-iso'

import { AccordListPage } from 'pages/accord/accord-list-page'
import { AccordSinglePage } from 'pages/accord/accord-item-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Аккорды
export const accordPages = [
	<Route path={ROUTE_LINK.accordIndex} component={AccordListPage} />,
	<Route path={ROUTE_LINK.accordDetail_CONST} component={AccordSinglePage} />,
]
