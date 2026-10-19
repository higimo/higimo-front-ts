import { FunctionComponent } from 'preact'
import { DemagogType } from 'api-types/demagog.types'

import { DemagogItem } from 'components/info-service/demagog/demagog-item'

import './style.css'

type DemagogListPropsType = {
	demagogList: DemagogType[]
}

export const DemagogList: FunctionComponent<DemagogListPropsType> = ({
	demagogList,
}) => (
	<div className="demagog">
		{demagogList.map(item => (
			<DemagogItem
				key={item.id}
				{...item}
			/>
		))}
	</div>
)
