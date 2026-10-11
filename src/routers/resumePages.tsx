import { Route } from 'preact-iso'

import { HiringResponsePage } from 'pages/hiring-response-page'
import { HowToWorkPage } from 'pages/resume/how-to-work-page'
import { ResumeIndexPage } from 'pages/resume/resume-index-page'
import { ResumeProductFullValuePage } from 'pages/resume/resume-product-full-value-page'
import { ResumeProductLeadPage } from 'pages/resume/resume-product-lead-page'
import { ResumeProductPage } from 'pages/resume/resume-product-page'
import { ResumeProductSmartPage } from 'pages/resume/resume-product-smart-page'
import { ResumeTechProductPage } from 'pages/resume/resume-tech-product-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Резюме
export const resumePages = [
	<Route path={ROUTE_LINK.resumeIndex} component={ResumeIndexPage} />,
	<Route path={ROUTE_LINK.resumeProduct} component={ResumeProductPage} />,
	<Route path={ROUTE_LINK.resumeTechProduct} component={ResumeTechProductPage} />,
	<Route path={ROUTE_LINK.resumeLead} component={ResumeProductLeadPage} />,
	<Route path={ROUTE_LINK.resumeHowToWork} component={HowToWorkPage} />,
	<Route path={ROUTE_LINK.resumeProductSmart} component={ResumeProductSmartPage} />,
	<Route path={ROUTE_LINK.resumeProductFull} component={ResumeProductFullValuePage} />,
	<Route path={ROUTE_LINK.response} component={HiringResponsePage} />,
]
