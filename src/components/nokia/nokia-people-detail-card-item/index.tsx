import { FunctionComponent } from 'preact'
import { NokiaPersonFullType } from 'api-types/nokia.types'

import { CollapseSection } from 'components/ui/collapse-section'
import { NokiaMeeting } from 'components/nokia/nokia-meeting'
import { NokiaNote } from 'components/nokia/nokia-note'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type NokiaPeopleDetailCardItemPropsType = {
	personItem: NokiaPersonFullType | null
}
export const NokiaPeopleDetailCardItem: FunctionComponent<NokiaPeopleDetailCardItemPropsType> = ({
	personItem
}) => personItem && (
	<div className="nokia-people-detail person-full-data">
		<div className="person-full-data__edit">
			<a href={ROUTE_LINKS.nokiaPeopleEdit({ personId: personItem.id })}>Редактировать профиль</a>
		</div>
		<div className="person-full-data__header">
			<div className="person-full-data__name">
				{personItem.name}
			</div>
			<div className="person-full-data__alias">
				<small>Алиас:</small> {personItem.alias}
			</div>
			<div className="person-full-data__nick">
				<small>Ник:</small> {personItem.nick}
			</div>
		</div>
		<h3>Описание</h3>
		{!!personItem.description && (
			<div className="person-full-data__description">{personItem.description}</div>
		)}
		<CollapseSection fold={true} header="Встречи">
			<div className="person-full-data__meetings">
				{personItem.meetings.map((meeting) => {
					return (
						<NokiaMeeting meeting={meeting} />
					)
				})}
			</div>
		</CollapseSection>
		<CollapseSection fold={true} header="Заметки">
			<div className="person-full-data__notes">
				{personItem.notes.map((note) => {
					return (
						<NokiaNote note={note} />
					)
				})}
			</div>
		</CollapseSection>
	</div>
)
