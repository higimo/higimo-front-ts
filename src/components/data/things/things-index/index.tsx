import { FunctionComponent } from 'preact'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

export const ThingsIndex: FunctionComponent = () => (
	<div className="content">
		<ul>
			<li><a href={ROUTE_LINKS.thingsNotebook}>Ноутбук</a></li>
			<li><a href={ROUTE_LINKS.thingsVelo}>Велосипед</a></li>
			<li><a href={ROUTE_LINKS.libraryIndex}>Библиотека</a></li>
		</ul>
	</div>
)
