import { FunctionComponent } from 'preact'
import { PeopleType } from 'types'
import { NokiaContextType } from 'context/nokia'

import { NokiaUserAvatar } from 'components/nokia/nokia-user-avatar'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type PersonMiniProfilePropsType = {
	hashLink: NokiaContextType['hashLink']
	hashMeeting: NokiaContextType['hashMeeting']
	hashPeople: NokiaContextType['hashPeople']
	links: NokiaContextType['links']
	meeting: NokiaContextType['meeting']
	people: NokiaContextType['people']
	person: PeopleType
}

export const PersonMiniProfile: FunctionComponent<PersonMiniProfilePropsType> = props => (
	<a href={ROUTE_LINKS.nokiaPeopleDetail({ personId: props.person.id.toString() })} className="person-mini-profile">
		<NokiaUserAvatar name={props.person.name} />
		<div className="person-mini-profile__name">
			{props.person.name}
			{' '}
			<small>
				{props.person.alias}
				{' '}
				{props.person.nick}
			</small>
		</div>
		<div className="person-mini-profile__buttons">
			<div className="person-mini-profile__edit">
				<a href={ROUTE_LINKS.nokiaPeopleEdit({ personId: props.person.id.toString() })}>edit</a>
			</div>
		</div>
	</a>
)