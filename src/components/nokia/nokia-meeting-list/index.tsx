import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType } from 'api-types/nokia.types'

import { NokiaMeetingItem } from 'components/nokia/nokia-meeting-item'

type NokiaMeetingListPropsType = {
	meetings: NokiaRichMeetingType[]
}

export const NokiaMeetingList: FunctionComponent<NokiaMeetingListPropsType> = ({
	meetings,
}) => (
	<div className="meeting-gallery">
		{meetings.map(meeting => (
			<NokiaMeetingItem key={meeting.id} meeting={meeting} />
		))}
	</div>
)
