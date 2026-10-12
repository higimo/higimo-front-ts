import { FunctionComponent } from 'preact'
import { NokiaMeetingFullType } from 'api-types/nokia.types'

import { NokiaPersonTag } from 'components/nokia/nokia-person-tag'

import { getHumanDate } from 'utils/date/get-human-date'

import { ROUTE_LINK } from 'dic/route/ROUTE_LINK'

type NokiaMeetingItemPropsType = {
	meeting: NokiaMeetingFullType
}

export const NokiaMeetingItem: FunctionComponent<NokiaMeetingItemPropsType> = ({
	meeting
}) => (
	<div className="nokia-people-detail-card-item__meeting meeting-gallery">
		<div className="meeting-gallery__item meeting">
			<div className="meeting__avatar" />
			<div className="meeting__description">
				{meeting.description}
			</div>
			<div className="meeting__information">
				<div className="meeting__date">
					{getHumanDate(meeting.date)}
				</div>
				<div className="meeting__type">
					<a href={ROUTE_LINK.nokiaFormEdit({ meetingId: meeting.id })}>{meeting.type}</a>
				</div>
			</div>
			<div className="meeting__persons">
				{meeting.person.map(person => (
					<NokiaPersonTag person={person} />
				))}
			</div>
		</div>
	</div>
)
