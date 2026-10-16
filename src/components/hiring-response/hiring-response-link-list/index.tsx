import { Fragment, FunctionComponent } from 'preact'

import { HiringResponseResumeLinkItem } from 'components/hiring-response/hiring-response-resume-link-item'

import { HIRING_LINK } from 'data/hiring-link'
import { RESUME_LINK } from 'data/resume-link'

import './style.css'

export const HiringResponseLinkList: FunctionComponent = () => (
	<div className="hiring-response-links">
		<div className="hiring-response-links__column">
			<h2>Искать работу</h2>
			{HIRING_LINK.map((item, index) => (
				<Fragment key={index}>
					{index > 0 && ' • '}
					<a href={item.href as string} className="nowrap">{item.title}</a>
				</Fragment>
			))}
		</div>
		<div className="hiring-response-links__column">
			<h2>Резюме</h2>
			{RESUME_LINK.map((item, index) => (
				<Fragment key={item.href}>
					{index > 0 && ' • '}
					<HiringResponseResumeLinkItem {...item} />
				</Fragment>
			))}
		</div>
	</div>
)
