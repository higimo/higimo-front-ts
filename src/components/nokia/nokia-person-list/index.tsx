import { FunctionComponent } from 'preact'
import { NokiaPersonType } from 'api-types/nokia.types'

import { PersonItem } from 'components/nokia/person-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type NokiaPersonListPropsType = {
	personList: NokiaPersonType[]
}

export const NokiaPersonList: FunctionComponent<NokiaPersonListPropsType> = ({
	personList,
}) => (
	<div className="nokia-people-list">
		{personList.map(person => (
			<PersonItem person={person} />
		))}
	</div>
)
