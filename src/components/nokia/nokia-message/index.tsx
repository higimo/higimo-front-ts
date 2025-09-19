import { MeetingType } from 'types'

import { useContext, useLayoutEffect } from 'preact/hooks'

import '../nokia-style.css'
import { NokiaContext } from 'context/nokia'

export const NokiaMessage = () => {
	const {
		fetchData,
		links,
		people,
		hashMeeting,
	} = useContext(NokiaContext)
	useLayoutEffect(fetchData, [])
	

	const persons = people.map(person => {
		const lastMeeting: MeetingType | null = links
			.filter(mp => mp.people_id === person.id)
			.map(arrOfMp => hashMeeting[arrOfMp.meeting_id])
			.sort((a, b) => b.date - a.date)
			.pop()
		return {
			...person,
			lastMeeting: (lastMeeting || {}).date,
			lastMeetingDescription: (lastMeeting || {}).description || null,
			lastMeetingType: (lastMeeting || {}).type || null,
		}
	})
	persons.sort((a, b) => b.lastMeeting - a.lastMeeting)

	return (
		<div className="meeting-gallery">
			{persons.map(person => (
				<div className="meeting-gallery__item meeting">
					<div className="meeting__date">
						{new Date(person.lastMeeting * 1000).toLocaleDateString()}
					</div>
					<div className="meeting__type">
						{person.lastMeetingType}
					</div>
					<div className="meeting__quality">
						<div className="person">{person.name}</div>
					</div>
					<div className="meeting__type">
						{person.lastMeetingDescription}
					</div>
				</div>
			))}
		</div>
	)
}
