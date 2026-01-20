import { FunctionComponent } from 'preact'
import { NokiaTagType } from 'types'

import { useContext } from 'preact/hooks'

import { PersonMiniProfile } from 'components/nokia/person-mini-profile'

import { NokiaContext, NokiaContextType } from 'context/nokia'

import '../nokia-style.css'

type NokiaPeopleListPropsType = {
	filter: NokiaTagType['id'];
	updateFilter: (tag: NokiaTagType["id"]) => void;
}
export const NokiaPeopleList: FunctionComponent<NokiaPeopleListPropsType> = (props) => {
	const {
		links,
		people,
		meeting,
		hashPeople,
		hashMeeting,
		hashPeopleTag,
		hashLink,
	} = useContext(NokiaContext) as NokiaContextType

	if (!people.length || !meeting.length || !links.length) {
		return null
	}

	return (
		<div>
			<div className="content">
				<div className="nokia-people-list">
					{people.filter(person => {
						if (!props.filter) {
							return true
						}

						return (hashPeopleTag[props.filter]).includes(person.id)
					}).map(person => (
						<PersonMiniProfile
							hashLink={hashLink}
							hashMeeting={hashMeeting}
							hashPeople={hashPeople}
							links={links}
							meeting={meeting}
							people={people}
							person={person}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
