import { Route } from 'preact-iso'

import { DemagogListPage } from 'pages/tools/demagog-list-page'
import { FaqFormPage } from 'pages/tools/faq/faq-form-page'
import { FaqListPage } from 'pages/tools/faq/faq-list-page'
import { FaqItemPage } from 'pages/tools/faq/faq-item-page'
import { LogismPage } from 'pages/info/logism-page'
import { ObuchenieListPage } from 'pages/tools/obuchenie/obuchenie-list-page'
import { ObuchenieItemPage } from 'pages/tools/obuchenie/obuchenie-item-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Инфосервисы
export const servicePages = [
	<Route path={ROUTE_LINK.logism} component={LogismPage} />,
	<Route path={ROUTE_LINK.demagog} component={DemagogListPage} />,
	<Route path={ROUTE_LINK.faqFormEdit_CONST} component={FaqFormPage} />,
	<Route path={ROUTE_LINK.faqForm} component={FaqFormPage} />,
	<Route path={ROUTE_LINK.faqDetail_CONST} component={FaqItemPage} />,
	<Route path={ROUTE_LINK.faqIndex} component={FaqListPage} />,
	<Route path={ROUTE_LINK.learningIndex} component={ObuchenieListPage} />,
	<Route path={ROUTE_LINK.learningDetail_CONST} component={ObuchenieItemPage} />,
]
