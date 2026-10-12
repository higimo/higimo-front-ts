import { Route } from 'preact-iso'

import { CinemaListPage } from 'pages/info-service/cinema/cinema-list-page'
import { CinemaScriptItemPage } from 'pages/info-service/cinema/cinema-script-item-page'
import { TableGamePage } from 'pages/info-service/table-game-page'
import { IgLinkPage } from 'pages/info-service/ig-link-page'
import { ThingsIndexPage } from 'pages/info-service/things/things-index-page'
import { ThingsNotebookPage } from 'pages/info-service/things/things-notebook-page'
import { ThingsVeloPage } from 'pages/info-service/things/things-velo-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Инфостраницы о себе
export const infoPages = [
	<Route path={ROUTE_LINK.gameIndex} component={TableGamePage} />,
	<Route path={ROUTE_LINK.thingsIndex} component={ThingsIndexPage} />,
	<Route path={ROUTE_LINK.thingsNotebook} component={ThingsNotebookPage} />,
	<Route path={ROUTE_LINK.thingsVelo} component={ThingsVeloPage} />,
	<Route path={ROUTE_LINK.igLink} component={IgLinkPage} />,
	<Route path={ROUTE_LINK.cinemaIndex} component={CinemaListPage} />,
	<Route path={ROUTE_LINK.cinemaScriptDetail_CONST} component={CinemaScriptItemPage} />,
]
