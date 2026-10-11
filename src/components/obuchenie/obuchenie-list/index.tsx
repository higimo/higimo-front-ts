import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type ObuchenieListPropsType = {
	lectionList: LectionType[] | null
}

export const ObuchenieList: FunctionComponent<ObuchenieListPropsType> = ({ lectionList }) => lectionList && (
	<div className="obuchenie-list">
		{lectionList.map(({ id, name, code }) => (
			<a
				key={id}
				href={ROUTE_LINK.learningDetail({ idcode: code })}
				className="obuchenie-list__element"
			>
				<div className="obuchenie-list__name">
					{name}
				</div>
			</a>
		))}
	</div>
)
