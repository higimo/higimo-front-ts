import { Route } from 'preact-iso'

import { HiringResponsePage } from 'pages/hiring-response-page'
import { HowToWorkPage } from 'pages/resume/how-to-work-page'
import { ResumeListPage } from 'pages/resume/resume-list-page'
import { ResumeProductFullDetailPage } from 'pages/resume/resume-product-full-detail-page'
import { ResumeProductLeadDetailPage } from 'pages/resume/resume-product-lead-detail-page'
import { ResumeProductDetailPage } from 'pages/resume/resume-product-detail-page'
import { ResumeProductSmartDetailPage } from 'pages/resume/resume-product-smart-detail-page'
import { ResumeTechProductDetailPage } from 'pages/resume/resume-tech-product-detail-page'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

// Резюме
export const resumePages = [
	<Route path={ROUTE_LINK.resumeIndex} component={ResumeListPage} />,
	<Route path={ROUTE_LINK.resumeProduct} component={ResumeProductDetailPage} />,
	<Route path={ROUTE_LINK.resumeTechProduct} component={ResumeTechProductDetailPage} />,
	<Route path={ROUTE_LINK.resumeLead} component={ResumeProductLeadDetailPage} />,
	<Route path={ROUTE_LINK.resumeHowToWork} component={HowToWorkPage} />,
	<Route path={ROUTE_LINK.resumeProductSmart} component={ResumeProductSmartDetailPage} />,
	<Route path={ROUTE_LINK.resumeProductFull} component={ResumeProductFullDetailPage} />,
	<Route path={ROUTE_LINK.response} component={HiringResponsePage} />,
]
