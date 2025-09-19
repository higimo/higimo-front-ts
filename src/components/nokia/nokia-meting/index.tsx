import { FunctionComponent } from "preact";
import { MeetingType, PeopleType } from "../../../types";

import { ROUTE_LINKS } from "../../../dic/ROUTE_LINKS";

type NokiaMetingPropsType = {
	curMeet: MeetingType;
	persons: PeopleType[];
}
export const NokiaMeting: FunctionComponent<NokiaMetingPropsType> = (props) => {
	return (
		<div className="nokia-people-detail-card-item__meeting meeting-gallery">
			<div className="meeting-gallery__item meeting">
				<div className="meeting__avatar" />
				<div className="meeting__description">
					{props.curMeet.description}
				</div>
				<div className="meeting__information">
					<div className="meeting__date">
						{new Date(props.curMeet.date * 1000).toLocaleDateString()}
					</div>
					<div className="meeting__type">
						<a href={ROUTE_LINKS.nokiaFormEdit({ meetingId: props.curMeet.id.toString() })}>{props.curMeet.type}</a>
					</div>
				</div>
				<div className="meeting__persons">
					{props.persons.map(person => (
						<span className="person">{person.name} </span>
					))}
				</div>
			</div>
		</div>
	)
}