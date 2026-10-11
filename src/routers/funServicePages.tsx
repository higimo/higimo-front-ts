import { Route } from 'preact-iso'

import { LinkPage } from 'pages/info/link-page'
import { PronPage } from 'pages/tools/pron-page'
import { YoutubePage } from 'pages/info/youtube-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Сервисы-развлекухи
export const funServicePages = [
	<Route path={ROUTE_LINK.pron} component={PronPage} />,
	<Route path={ROUTE_LINK.youtube} component={YoutubePage} />,
	<Route path={ROUTE_LINK.links} component={LinkPage} />,
]
