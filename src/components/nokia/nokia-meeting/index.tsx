import { FunctionComponent } from 'preact'
import { NokiaMeetingFullType } from 'api-types/nokia.types'

import { NokiaPersonTag } from 'components/nokia/nokia-person-tag'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

type NokiaMetingPropsType = {
	meeting: NokiaMeetingFullType
}
export const NokiaMeeting: FunctionComponent<NokiaMetingPropsType> = ({ meeting }) => {
	return (
		<div className="nokia-people-detail-card-item__meeting meeting-gallery">
			<div className="meeting-gallery__item meeting">
				<div className="meeting__avatar" />
				<div className="meeting__description">
					{meeting.description}
				</div>
				<div className="meeting__information">
					<div className="meeting__date">
						{new Date(meeting.date * 1000).toLocaleDateString()}
					</div>
					<div className="meeting__type">
						<a href={ROUTE_LINKS.nokiaFormEdit({ meetingId: meeting.id })}>{meeting.type}</a>
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
}
