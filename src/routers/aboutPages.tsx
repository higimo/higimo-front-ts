import { PrivateRoute } from 'components/util/private-route'
import { Route } from 'preact-iso'

import { ComojiListPage } from 'pages/tools/comoji-list-page'
import { EmailerPage } from 'pages/tools/emailer-page'
import { LibFromPage } from 'pages/data/lib/lib-form-page'
import { LibListPage } from 'pages/data/lib/lib-list-page'
import { MagicBallPage } from 'pages/tools/magic-ball-page'
import { PetProjectFormPage } from 'pages/tools/pet-project/pet-project-form-page'
import { PetProjectListPage } from 'pages/tools/pet-project/pet-project-list-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Сервисы о себе
export const aboutPages = [
	<Route path={ROUTE_LINK.libraryIndex} component={LibListPage} />,
	<PrivateRoute path={ROUTE_LINK.libraryForm} component={LibFromPage} />,
	<PrivateRoute path={ROUTE_LINK.libraryFormEdit_CONST} component={LibFromPage} />,
	<Route path={ROUTE_LINK.emailer} component={EmailerPage} />,
	<Route path={ROUTE_LINK.comoji} component={ComojiListPage} />,
	<Route path={ROUTE_LINK.magic} component={MagicBallPage} />,
	<Route path={ROUTE_LINK.petProject} component={PetProjectListPage} />,
	<PrivateRoute path={ROUTE_LINK.petProjectCreate} component={PetProjectFormPage} />,
	<PrivateRoute path={ROUTE_LINK.petProjectEdit_CONST} component={PetProjectFormPage} />,
]
