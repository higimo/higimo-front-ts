import { FunctionComponent } from 'preact'
import { NokiaPersonType } from 'api-types/nokia.types'

import { PersonItem } from 'components/nokia/person-item'

type NokiaPersonListPropsType = {
	personList: NokiaPersonType[]
}

export const NokiaPersonList: FunctionComponent<NokiaPersonListPropsType> = ({
	personList,
}) => (
	<div className="nokia-people-list">
		{personList.map(person => (
			<PersonItem key={person.id} person={person} />
		))}
	</div>
)
