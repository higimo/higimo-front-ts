import { Fragment, FunctionComponent } from 'preact'

import { HiringResponseResumeLink } from 'components/hiring-response/hiring-response-links/HiringResponseResumeLink'

import { HIRING_LINKS } from 'data/HIRING_LINKS'
import { RESUME_LINKS } from 'data/RESUME_LINKS'

import './style.css'

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
