import { FunctionComponent } from 'preact'
import { NokiaPersonType, NokiaTagType } from 'api-types/nokia.types'

import { PersonCard } from 'components/nokia/person-card'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

const filterPersons = (person: NokiaPersonType, filter: NokiaTagType['id'] | null) =>
	person.tags.find(tag => tag.id === filter)

type NokiaPeopleListPropsType = {
	personList: NokiaPersonType[] | null
	filter: NokiaTagType['id'] | null
}
export const NokiaPeopleList: FunctionComponent<NokiaPeopleListPropsType> = ({
	personList,
	filter,
}) => {
	if (!personList) {
		return null
	}

	const filtredPerson = filter ? personList.filter(person => filterPersons(person, filter)) : personList

	return (
		<div className="content">
			<div className="nokia-people-list">
				{filtredPerson.map(person => (
					<PersonCard person={person} />
				))}
			</div>
		</div>
	)
}
