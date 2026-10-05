import { Route } from 'preact-iso'

import { LinksPage } from 'pages/info/links-page'
import { PronPage } from 'pages/tools/pron-page'
import { YoutubePage } from 'pages/info/youtube-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Сервисы-развлекухи
export const funServicePages = [
	<Route path={ROUTE_LINKS.pron} component={PronPage} />,
	<Route path={ROUTE_LINKS.youtube} component={YoutubePage} />,
	<Route path={ROUTE_LINKS.links} component={LinksPage} />,
]
