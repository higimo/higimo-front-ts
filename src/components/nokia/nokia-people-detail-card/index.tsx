import { useContext, useLayoutEffect } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import '../nokia-style.css'
import { NotFoundPage } from 'pages/not-found-page'
import { NokiaContext, NokiaContextType } from 'context/nokia'
import { NokiaPeopleDetailCardItem } from '../nokia-people-detail-card-item'

export const NokiaPeopleDetailCard = () => {
	const { params: { personId = '-1'}} = useRoute()
	const {
		fetchData,
		links,
		people,
		meeting,
		hashPeople,
		hashMeeting,
		hashLink,
	} = useContext(NokiaContext) as NokiaContextType
	useLayoutEffect(fetchData, [])

	if (!people.length || !meeting.length || !links.length) {
		return null
	}

	const curPerson = people.find(i => i.id == parseInt(personId, 10)) || null
	if (!curPerson) {
		return <NotFoundPage />
	}

	return (
		<div className="content">
			<NokiaPeopleDetailCardItem
				person={curPerson}
				hashLink={hashLink}
				hashMeeting={hashMeeting}
				hashPeople={hashPeople}
				links={links}
				meeting={meeting}
				people={people}
			/>
		</div>
	)
}
