import { FunctionComponent } from 'preact'
import { NokiaPersonType } from 'types'

import { NokiaTag } from 'components/nokia/nokia-tag'
import { NokiaUserAvatar } from 'components/nokia/nokia-user-avatar'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import './style.css'

type PersonMiniProfilePropsType = {
	person: NokiaPersonType
}

export const PersonCard: FunctionComponent<PersonMiniProfilePropsType> = ({ person }) => (
	<a
		href={ROUTE_LINKS.nokiaPeopleDetail({ personId: person.id.toString() })}
		className="person-mini-profile"
	>
		<NokiaUserAvatar name={person.name} />
		<div className="person-mini-profile__name">
			{person.name}
		</div>
		<div className="person-mini-profile__alias">
			{person.alias}
		</div>
		<div className="person-mini-profile__nick">
			{person.nick}
		</div>
		<div className="person-mini-profile__tags">
			{person.tags.map(tag => (<NokiaTag tag={tag} />))}
		</div>
		<div className="person-mini-profile__buttons">
			<div className="person-mini-profile__edit">
				<a href={ROUTE_LINKS.nokiaPeopleEdit({ personId: person.id.toString() })}>edit</a>
			</div>
		</div>
	</a>
)
