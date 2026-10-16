import { FunctionComponent } from 'preact'
import { NokiaPersonType } from 'api-types/nokia.types'

import { NokiaTag } from 'components/nokia/nokia-tag'
import { NokiaUserAvatar } from 'components/nokia/nokia-user-avatar'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

import './style.css'

type PersonItemPropsType = {
	person: NokiaPersonType
}

export const PersonItem: FunctionComponent<PersonItemPropsType> = ({ person }) => (
	<a
		href={ROUTE_LINK.nokiaPeopleDetail({ personId: person.id })}
		className="person-mini-profile"
	>
		<NokiaUserAvatar name={person.name} />
		<div className="person-mini-profile__name">
			{person.name}
		</div>
		{person.alias && (
			<div className="person-mini-profile__alias">
				{person.alias}
			</div>
		)}
		{person.nick && (
			<div className="person-mini-profile__nick">
				{person.nick}
			</div>
		)}
		{person.tags && (
			<div className="person-mini-profile__tags">
				{person.tags.map(tag => (<NokiaTag key={tag.id} tag={tag} />))}
			</div>
		)}
		<div className="person-mini-profile__buttons">
			<div className="person-mini-profile__edit">
				<a href={ROUTE_LINK.nokiaPeopleEdit({ personId: person.id })}>edit</a>
			</div>
		</div>
	</a>
)
