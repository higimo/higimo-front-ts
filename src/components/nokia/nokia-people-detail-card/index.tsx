import { useContext, useLayoutEffect } from 'preact/hooks'
import { useRoute } from 'preact-iso'

import { NokiaPeopleDetailCardItem } from 'components/nokia/nokia-people-detail-card-item'

import { NokiaContext, NokiaContextType } from 'context/nokia'

import { NotFoundPage } from 'pages/not-found-page'

import '../nokia-style.css'

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
