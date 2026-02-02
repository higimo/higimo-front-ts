import { FunctionComponent } from 'preact'
import { NewNokiaMicroMeeting } from 'types'

import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

// TODO: есть какие-то другие ещё встречи, почему они отдельно от этого?
// TODO: этот переименовать в MICRO
type NokiaMetingPropsType = {
	meeting: NewNokiaMicroMeeting
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
						<a href={ROUTE_LINKS.nokiaFormEdit({ meetingId: meeting.id.toString() })}>{meeting.type}</a>
					</div>
				</div>
				<div className="meeting__persons">
					{meeting.person.map(person => (
						<span className="meeting__person-name">{person.name} </span>
					))}
				</div>
			</div>
		</div>
	)
}
