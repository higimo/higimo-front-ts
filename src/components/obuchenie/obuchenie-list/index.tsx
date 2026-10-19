import { FunctionComponent } from 'preact'
import { LectionType } from 'api-types/lection.types'

import { ObuchenieItem } from 'components/obuchenie/obuchenie-item'

import './style.css'

type ObuchenieListPropsType = {
	lectionList: LectionType[]
}

export const ObuchenieList: FunctionComponent<ObuchenieListPropsType> = ({
	lectionList,
}) => (
	<div className="obuchenie-list">
		{lectionList.map((item) => (
			<ObuchenieItem
				key={item.id}
				{...item}
			/>
		))}
	</div>
)
