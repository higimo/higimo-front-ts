import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

type ObuchenieListPropsType = {
	lectionList: LectionType[] | null
}
export const ObuchenieList: FunctionComponent<ObuchenieListPropsType> = ({ lectionList }) => lectionList && (
	<div className="obuchenie-list">
		{lectionList.map(({ id, name, code }) => (
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
