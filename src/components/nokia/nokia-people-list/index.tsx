import { FunctionComponent } from 'preact'
import { NokiaTagType } from 'types'

import { useContext } from 'preact/hooks'

import { PersonMiniProfile } from 'components/nokia/person-mini-profile'

import { NokiaContext, NokiaContextType } from 'context/nokia'

import '../nokia-style.css'

const filterPersons = (person, filter) => person.tags.find(tag => tag.id === filter)

type NokiaPeopleListPropsType = {
	filter: NokiaTagType['id']
	updateFilter: (tag: NokiaTagType["id"]) => void
}
export const NokiaPeopleList: FunctionComponent<NokiaPeopleListPropsType> = (props) => {
	const { persons } = useContext(NokiaContext) as NokiaContextType

	if (!persons.length) {
		return null
	}

	const filtredPerson = props.filter ? persons.filter(person => filterPersons(person, props.filter)) : persons

	return (
		<div>
			<div className="content">
				<div className="nokia-people-list">
					{filtredPerson.map(person => (
						<PersonMiniProfile person={person} />
					))}
				</div>
			</div>
		</div>
	)
}
