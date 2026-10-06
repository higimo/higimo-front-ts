import { Route } from 'preact-iso'

import { DemagogPage } from 'pages/tools/demagog-page'
import { FaqFormPage } from 'pages/tools/faq/faq-form-page'
import { FaqListPage } from 'pages/tools/faq/faq-list-page'
import { FaqSinglePage } from 'pages/tools/faq/faq-single-page'
import { LogismPage } from 'pages/info/logism-page'
import { ObuchenieListPage } from 'pages/tools/obuchenie/obuchenie-list-page'
import { ObuchenieSinglePage } from 'pages/tools/obuchenie/obuchenie-single-page'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Инфосервисы
export const servicePages = [
	<Route path={ROUTE_LINKS.logism} component={LogismPage} />,
	<Route path={ROUTE_LINKS.demagog} component={DemagogPage} />,
	<Route path={ROUTE_LINKS.faqFormEdit_CONST} component={FaqFormPage} />,
	<Route path={ROUTE_LINKS.faqForm} component={FaqFormPage} />,
	<Route path={ROUTE_LINKS.faqDetail_CONST} component={FaqSinglePage} />,
	<Route path={ROUTE_LINKS.faqIndex} component={FaqListPage} />,
	<Route path={ROUTE_LINKS.learningIndex} component={ObuchenieListPage} />,
	<Route path={ROUTE_LINKS.learningDetail_CONST} component={ObuchenieSinglePage} />,
]
