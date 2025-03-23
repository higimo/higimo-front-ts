import { FunctionComponent } from 'preact'

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS'

import './style.css'

export const AccordLink: FunctionComponent = () => (
	<div className="accord-link">
		<a href={ROUTE_LINKS.accordIndex} className="accord-link__link">Аккорды</a>
	</div>
)
