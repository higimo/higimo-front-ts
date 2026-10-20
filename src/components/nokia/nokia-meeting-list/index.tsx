import { FunctionComponent } from 'preact'
import { NokiaMeetingFullType } from 'api-types/nokia.types'

import { NokiaMeetingItem } from 'components/nokia/nokia-meeting-item'

type NokiaMeetingListPropsType = {
	meetingList: NokiaMeetingFullType[]
}

export const NokiaMeetingList: FunctionComponent<NokiaMeetingListPropsType> = ({
	meetingList,
}) => (
	<div className="meeting-gallery">
		{meetingList.map(meeting => (
			<NokiaMeetingItem key={meeting.id} meeting={meeting} />
		))}
	</div>
)
