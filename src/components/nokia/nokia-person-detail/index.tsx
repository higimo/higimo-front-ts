import { FunctionComponent } from 'preact'
import { NokiaPersonFullType } from 'api-types/nokia.types'

import { CollapseSection } from 'components/ui/collapse-section'
import { NokiaMeetingList } from 'components/nokia/nokia-meeting-list'
import { NokiaNote } from 'components/nokia/nokia-note'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type NokiaPersonDetailCardItemPropsType = {
	personItem: NokiaPersonFullType | null
}

export const NokiaPersonDetail: FunctionComponent<NokiaPersonDetailCardItemPropsType> = ({
	personItem,
}) => personItem && (
	<div className="nokia-people-detail person-full-data">
		<div className="person-full-data__edit">
			<a href={ROUTE_LINK.nokiaPeopleEdit({ personId: personItem.id })}>Редактировать профиль</a>
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

		<h2>Описание</h2>
		{!!personItem.description && (
			<div className="person-full-data__description">{personItem.description}</div>
		)}

		<CollapseSection fold={false} title="Встречи">
			<div className="person-full-data__meetings">
				<NokiaMeetingList meetingList={personItem.meetings} />
			</div>
		</CollapseSection>

		<CollapseSection fold={false} title="Заметки">
			<div className="person-full-data__notes">
				{personItem.notes.map((note) => (
					<NokiaNote key={note.id} note={note} />
				))}
			</div>
		</CollapseSection>
	</div>
)
