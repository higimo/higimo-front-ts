import { NokiaRichMeetingType } from 'types'

import { useEmptyDataState } from 'hook/use-empty-data-state'
import { useLoadingState } from 'hook/use-loading-state'
import useApi from 'hook/use-api'

import { Loading } from 'components/ui/loading'

import { NotFoundPage } from 'pages/not-found-page'

import { API_ROUTE } from 'dic/api-route'
import { ROUTE_LINKS } from 'dic/ROUTE_LINKS'

import '../nokia-style.css'
import { NokiaPersonTag } from '../nokia-person-tag'

export const NokiaIndex = () => {
	const [richMeeting] = useApi<NokiaRichMeetingType>(API_ROUTE.nokiaRichMeeting)
	const isLoadingRichMeeting = useLoadingState([richMeeting.status])
	const isEmptyRichMeeting = useEmptyDataState(richMeeting.data)

	if (isLoadingRichMeeting) {
		return <Loading />
	}
	if (isEmptyRichMeeting) {
		return <NotFoundPage />
	}

	return (
		<div className="meeting-gallery">
			{richMeeting.data.map(item => (
				<div className={`meeting-gallery__item meeting type-${item.type}`}>
					<div className="meeting__description">
						{item.description}
					</div>
					<div className="meeting__information">
						<div className="meeting__date">
							{new Date(item.date * 1000).toLocaleDateString()}
						</div>
						<div className="meeting__type">
							<a href={ROUTE_LINKS.nokiaFormEdit({ meetingId: item.id.toString() })}>{item.type}</a>
						</div>
					</div>
					<div className="meeting__person-gallery">
						{item.person.map(person => (
							<NokiaPersonTag person={person} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
