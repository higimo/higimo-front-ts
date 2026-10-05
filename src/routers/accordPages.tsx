import { Route } from 'preact-iso'

import { AccordIndexPage } from 'pages/accord/accord-index-page'
import { AccordSinglePage } from 'pages/accord/accord-single-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Аккорды
export const accordPages = [
	<Route path={ROUTE_LINKS.accordIndex} component={AccordIndexPage} />,
	<Route path={ROUTE_LINKS.accordDetail_CONST} component={AccordSinglePage} />,
]
