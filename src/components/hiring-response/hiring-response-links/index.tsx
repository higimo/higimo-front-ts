import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'
import { Fragment, FunctionComponent } from 'preact'

import { copyToClipboard } from 'utils/copy-to-clipboard'

import './style.css'

const HIRING_LINKS = [
	{
		title: 'LinkedIn',
		href: 'https://www.linkedin.com/feed/',
	},
	{
		title: 'hh',
		href: 'https://hh.ru/search/vacancy?resume=52d43beeff10b0af7c0039ed1f623763446351&from=resumelist&hhtmFrom=applicant_profile',
	},
	{
		title: 'hirify',
		href: 'https://hirify.me/?grade=middle,senior,lead,junior,head&sources=telegram,hirify,ru_global&specializations=frontend_dev',
	},
	{
		title: 'GetMatch',
		href: 'https://getmatch.ru/vacancies?p=1&sa=any&pa=all&se=junior&se=middle&se=senior&sp=js_frontend',
	},
] as const

type ResumeLinkType = {
	href: string
	title: string
	copy: string
	pdf?: string
}
const RESUME_LINKS: ResumeLinkType[] = [
	{
		href: ROUTE_LINKS.resumeHowToWork,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeHowToWork}`,
		title: 'Как работаю',
	},
	{
		href: ROUTE_LINKS.resumeProduct,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeProduct}`,
		title: 'Senior Product',
	},
	{
		href: ROUTE_LINKS.resumeTechProduct,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeTechProduct}`,
		title: 'Tech Product',
	},
	{
		href: ROUTE_LINKS.resumeLead,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeLead}`,
		title: 'Lead Product',
	},
	{
		href: ROUTE_LINKS.resumeProductSmart,
		copy: `https://higimo.ru${ROUTE_LINKS.resumeProductSmart}`,
		title: 'Product Smart',
	},
	{
		href: 'https://hh.ru/resume/52d43beeff10b0af7c0039ed1f623763446351',
		copy: 'https://hh.ru/resume/52d43beeff10b0af7c0039ed1f623763446351',
		title: 'Front HH',
	},
	// Frontend
	// Senior Product [PDF (⧉)]
] as const

type HiringResponseResumeLinkPropsType = ResumeLinkType
const HiringResponseResumeLink: FunctionComponent<HiringResponseResumeLinkPropsType> = ({ title, href, copy, pdf }) => {
	const handleCopyClick = () => {
		copyToClipboard(copy)
	}
	return (
		<Fragment>
			<a href={href} className="nowrap">{title}</a>
			{pdf && (
				<a href={pdf}>{' '}[PDF]</a>
			)}
			{copy && (
				<span onClick={handleCopyClick}>{' '}(⧉)</span>
			)}
		</Fragment>
	)
}

export const HiringResponseLinks: FunctionComponent = () => (
	<div className="hiring-response-links">
		<div className="hiring-response-links__column">
			<h2>Искать работу</h2>
			{HIRING_LINKS.map((item, index) => (
				<Fragment>
					{index > 0 && ' • '}
					<a href={item.href} className="nowrap">{item.title}</a>
				</Fragment>
			))}
		</div>
		<div className="hiring-response-links__column">
			<h2>Резюме</h2>
			{RESUME_LINKS.map((item, index) => (
				<Fragment>
					{index > 0 && ' • '}
					<HiringResponseResumeLink {...item} />
				</Fragment>
			))}
		</div>
	</div>
)
