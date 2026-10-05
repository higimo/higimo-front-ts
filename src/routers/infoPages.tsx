import { Route } from 'preact-iso'

import { CinemaIndexPage } from 'pages/info/cinema-index-page'
import { CinemaScriptPage } from 'pages/info/cinema-script-page'
import { CinemaSinglePage } from 'pages/info/cinema-single-page'
import { GamePage } from 'pages/info/game-page'
import { IgLinkPage } from 'pages/info/ig-link-page'
import { ThingsIndexPage } from 'pages/info/things/things-index-page'
import { ThingsNotebookPage } from 'pages/info/things/things-notebook-page'
import { ThingsVeloPage } from 'pages/info/things/things-velo-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Инфостраницы о себе
export const infoPages = [
	<Route path={ROUTE_LINKS.gameIndex} component={GamePage} />,
	<Route path={ROUTE_LINKS.thingsIndex} component={ThingsIndexPage} />,
	<Route path={ROUTE_LINKS.thingsNotebook} component={ThingsNotebookPage} />,
	<Route path={ROUTE_LINKS.thingsVelo} component={ThingsVeloPage} />,
	<Route path={ROUTE_LINKS.igLink} component={IgLinkPage} />,
	<Route path={ROUTE_LINKS.cinemaIndex} component={CinemaIndexPage} />,
	<Route path={ROUTE_LINKS.cinemaScriptIndex} component={CinemaScriptPage} />,
	<Route path={ROUTE_LINKS.cinemaScriptDetail_CONST} component={CinemaSinglePage} />,
]
