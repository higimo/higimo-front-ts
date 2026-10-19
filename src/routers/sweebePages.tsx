import { PrivateRoute } from 'components/util/private-route'

import { NokiaPersonFormPage } from 'pages/nokia/nokia-person-form-page'
import { NokiaMeetingListPage } from 'pages/nokia/nokia-meeting-list-page'
import { NokiaMeetingFormPage } from 'pages/nokia/nokia-meeting-form-page'
import { NokiaPersonDetailPage } from 'pages/nokia/nokia-person-item-page'
import { NokiaPersonListPage } from 'pages/nokia/nokia-person-list-page'
import { NokiaStatisticPage } from 'pages/nokia/nokia-statistic-page'
import { PinarikPage } from 'pages/nokia/pinarik-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Nokia / Sweebe
export const sweebePages = [
	<PrivateRoute path={ROUTE_LINK.nokiaIndex} component={NokiaMeetingListPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaPeople} component={NokiaPersonListPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaForm} component={NokiaMeetingFormPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaFormEdit_CONST} component={NokiaMeetingFormPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaPeopleForm} component={NokiaPersonFormPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaPeopleDetail_CONST} component={NokiaPersonDetailPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaPeopleEdit_CONST} component={NokiaPersonFormPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaStatistic} component={NokiaStatisticPage} />,
	<PrivateRoute path={ROUTE_LINK.nokiaPinarik} component={PinarikPage} />,
]
