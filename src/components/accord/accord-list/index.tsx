import { FunctionComponent } from 'preact'
import { AccordRealTagType } from 'api-types/accord.types'

import { AccordItem } from 'components/accord/accord-item'

type AccordListPropsType = {
	accordList: AccordRealTagType[]
}

export const AccordList: FunctionComponent<AccordListPropsType> = ({
	accordList,
}) => (
	<div className="accord-list">
		{accordList.map(item => (
			<AccordItem key={item.id} {...item} />
		))}
	</div>
)
