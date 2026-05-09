import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

type ObuchenieListPropsType = {
	lections: LectionType[]
}
export const ObuchenieList: FunctionComponent<ObuchenieListPropsType> = ({ lections }) => (
	<div className="obuchenie-list">
		{lections.map(({ id, name, code }) => (
			<a
				key={id}
				href={ROUTE_LINKS.learningDetail({ idcode: code })}
				className="obuchenie-list__element"
			>
				<div className="obuchenie-list__name">
					{name}
				</div>
			</a>
		))}
	</div>
)
