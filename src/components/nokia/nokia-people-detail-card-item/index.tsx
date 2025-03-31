import { FunctionComponent } from "preact"
import { PeopleType } from '../../../types';
import { NokiaContextType } from "../../../context/nokia";

import { NokiaMeting } from '../nokia-meting';

import { ROUTE_LINKS } from '../../../dic/ROUTE_LINKS';
import { CollapseSection } from "../../ui/collapse-section";

type NokiaPeopleDetailCardItemPropsType = {
    person: PeopleType;
    hashLink: NokiaContextType['hashLink'];
    hashMeeting: NokiaContextType['hashMeeting'];
    hashPeople: NokiaContextType['hashPeople'];
    links: NokiaContextType['links'];
    meeting: NokiaContextType['meeting'];
    people: NokiaContextType['people'];
}
export const NokiaPeopleDetailCardItem: FunctionComponent<NokiaPeopleDetailCardItemPropsType> = props => {
	const meetByPerson = props.links
		.filter(mp => mp.people_id == props.person.id)
		.map(mp => {
			const curMeet = props.hashMeeting[mp.meeting_id]
			if (!curMeet) {
				return null
			}
			const persons = props.hashLink[curMeet.id].map(manId => props.hashPeople[manId])
			return { ...mp, curMeet, persons }
		})
		.filter(Boolean)
		.sort((a, b) => b.curMeet.date - a.curMeet.date)

	return (
		<div className="nokia-people-detail-card-item">
			<div className="nokia-people-detail-card-item__name">
				{props.person.name}
			</div>
			<div className="nokia-people-detail-card-item__edit">
				<a href={ROUTE_LINKS.nokiaPeopleEdit({ personId: props.person.id.toString() })}>Редактировать профиль</a>
			</div>
			<div className="nokia-people-detail-card-item__alias">
				<small>Алиас:</small> {props.person.alias}
			</div>
			<div className="nokia-people-detail-card-item__nick">
				<small>Ник:</small> {props.person.nick}
			</div>
			{!!props.person.description && (
				<div className="nokia-people-detail-card-item__description">{props.person.description}</div>
			)}
			<CollapseSection fold={true} header="Встречи">
				<div className="nokia-people-detail-card-item__meetings">
					{meetByPerson.map(({ curMeet, persons }) => {
						return (
							<NokiaMeting curMeet={curMeet} persons={persons} />
						)
					})}
				</div>
			</CollapseSection>
		</div>
	)
}