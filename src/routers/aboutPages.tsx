import { PrivateRoute } from 'components/util/private-route'
import { Route } from 'preact-iso'

import { ComojiPage } from 'pages/tools/comoji-page'
import { EmailerPage } from 'pages/tools/emailer-page'
import { LibFromPage } from 'pages/tools/lib/lib-form-page'
import { LibIndexPage } from 'pages/tools/lib/lib-index-page'
import { MagicBallPage } from 'pages/tools/magic-ball-page'
import { PetProjectFormPage } from 'pages/tools/pet-project/pet-project-form-page'
import { PetProjectPage } from 'pages/tools/pet-project/pet-project-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Сервисы о себе
export const aboutPages = [
	<Route path={ROUTE_LINKS.libraryIndex} component={LibIndexPage} />,
	<PrivateRoute path={ROUTE_LINKS.libraryForm} component={LibFromPage} />,
	<PrivateRoute path={ROUTE_LINKS.libraryFormEdit_CONST} component={LibFromPage} />,
	<Route path={ROUTE_LINKS.emailer} component={EmailerPage} />,
	<Route path={ROUTE_LINKS.comoji} component={ComojiPage} />,
	<Route path={ROUTE_LINKS.magic} component={MagicBallPage} />,
	<Route path={ROUTE_LINKS.petProject} component={PetProjectPage} />,
	<PrivateRoute path={ROUTE_LINKS.petProjectCreate} component={PetProjectFormPage} />,
	<PrivateRoute path={ROUTE_LINKS.petProjectEdit_CONST} component={PetProjectFormPage} />,
]
