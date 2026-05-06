import { FunctionComponent } from 'preact'
import { NokiaPersonFullType } from 'api-types/nokia.types'

import { CollapseSection } from 'components/ui/collapse-section'
import { NokiaMeeting } from 'components/nokia/nokia-meeting'
import { NokiaNote } from 'components/nokia/nokia-note'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type NokiaPeopleDetailCardItemPropsType = {
	person: NokiaPersonFullType
}
export const NokiaPeopleDetailCardItem: FunctionComponent<NokiaPeopleDetailCardItemPropsType> = ({ person }) => {
	return (
		<div className="nokia-people-detail person-full-data">
			<div className="person-full-data__edit">
				<a href={ROUTE_LINKS.nokiaPeopleEdit({ personId: person.id.toString() })}>Редактировать профиль</a>
			</div>
			<div className="person-full-data__header">
				<div className="person-full-data__name">
					{person.name}
				</div>
				<div className="person-full-data__alias">
					<small>Алиас:</small> {person.alias}
				</div>
				<div className="person-full-data__nick">
					<small>Ник:</small> {person.nick}
				</div>
			</div>
			<h3>Описание</h3>
			{!!person.description && (
				<div className="person-full-data__description">{person.description}</div>
			)}
			<CollapseSection fold={true} header="Встречи">
				<div className="person-full-data__meetings">
					{person.meetings.map((meeting) => {
						return (
							<NokiaMeeting meeting={meeting} />
						)
					})}
				</div>
			</CollapseSection>
			<CollapseSection fold={true} header="Заметки">
				<div className="person-full-data__notes">
					{person.notes.map((note) => {
						return (
							<NokiaNote note={note} />
						)
					})}
				</div>
			</CollapseSection>
		</div>
	)
}
