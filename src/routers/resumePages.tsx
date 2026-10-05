import { Route } from 'preact-iso'

import { HiringResponsePage } from 'pages/hiring-response/hiring-response-page'
import { HowToWorkPage } from 'pages/resume/how-to-work-page'
import { ResumeIndexPage } from 'pages/resume/resume-index-page'
import { ResumeProductFullValuePage } from 'pages/resume/resume-full-value-page'
import { ResumeProductLeadPage } from 'pages/resume/resume-product-lead-page'
import { ResumeProductPage } from 'pages/resume/resume-product-page'
import { ResumeProductSmartPage } from 'pages/resume/resume-product-smart-page'
import { ResumeTechProductPage } from 'pages/resume/resume-tech-product'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// Резюме
export const resumePages = [
	<Route path={ROUTE_LINKS.resumeIndex} component={ResumeIndexPage} />,
	<Route path={ROUTE_LINKS.resumeProduct} component={ResumeProductPage} />,
	<Route path={ROUTE_LINKS.resumeTechProduct} component={ResumeTechProductPage} />,
	<Route path={ROUTE_LINKS.resumeLead} component={ResumeProductLeadPage} />,
	<Route path={ROUTE_LINKS.resumeHowToWork} component={HowToWorkPage} />,
	<Route path={ROUTE_LINKS.resumeProductSmart} component={ResumeProductSmartPage} />,
	<Route path={ROUTE_LINKS.resumeProductFull} component={ResumeProductFullValuePage} />,
	<Route path={ROUTE_LINKS.response} component={HiringResponsePage} />,
]
