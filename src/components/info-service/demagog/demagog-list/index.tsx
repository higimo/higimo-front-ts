import { FunctionComponent } from 'preact'
import { DemagogType } from 'api-types/demagog.types'

import { DemagogItem } from 'components/info-service/demagog/demagog-item'

import './style.css'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type DemagogListPropsType = {
	demagogList: DemagogType[] | null
}

export const DemagogList: FunctionComponent<DemagogListPropsType> = ({ demagogList }) => demagogList && (
	<div className="demagog">
		{demagogList.map(item => <DemagogItem {...item} />)}
	</div>
)
