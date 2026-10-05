import { PrivateRoute } from 'components/util/private-route'

import { NokiaAddPersonPage } from 'pages/nokia/nokia-add-person-page'
import { NokiaIndexPage } from 'pages/nokia/nokia-index-page'
import { NokiaMeetingFormPage } from 'pages/nokia/nokia-form-page'
import { NokiaPeopleDetailCardPage } from 'pages/nokia/nokia-people-detail-card-page'
import { NokiaPeopleListPage } from 'pages/nokia/nokia-people-list-page'
import { NokiaStatisticPage } from 'pages/nokia/nokia-statistic-page'
import { PinarikPage } from 'pages/nokia/pinarik-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Nokia / Sweebe
export const sweebePages = [
	<PrivateRoute path={ROUTE_LINKS.nokiaIndex} component={NokiaIndexPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaPeople} component={NokiaPeopleListPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaForm} component={NokiaMeetingFormPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaFormEdit_CONST} component={NokiaMeetingFormPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaPeopleForm} component={NokiaAddPersonPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaPeopleDetail_CONST} component={NokiaPeopleDetailCardPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaPeopleEdit_CONST} component={NokiaAddPersonPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaStatistic} component={NokiaStatisticPage} />,
	<PrivateRoute path={ROUTE_LINKS.nokiaPinarik} component={PinarikPage} />,
]
