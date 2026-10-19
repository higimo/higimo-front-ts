import { FunctionComponent } from 'preact'
import { NokiaPersonType } from 'api-types/nokia.types'

import { NokiaPersonItem } from 'components/nokia/nokia-person-item'

type NokiaPersonListPropsType = {
	personList: NokiaPersonType[]
}

export const NokiaPersonList: FunctionComponent<NokiaPersonListPropsType> = ({
	personList,
}) => (
	<div className="nokia-people-list">
		{personList.map(person => (
			<NokiaPersonItem key={person.id} person={person} />
		))}
	</div>
)
