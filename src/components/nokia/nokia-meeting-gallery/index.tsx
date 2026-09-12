import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType } from 'api-types/nokia.types'

import { NokiaMeeting } from 'components/nokia/nokia-meeting'

type NokiaMeetingGallery = {
	meetings: NokiaRichMeetingType[]
}
export const NokiaMeetingGallery: FunctionComponent<NokiaMeetingGallery> = ({ meetings }) => (
	<div className="meeting-gallery">
		{meetings.map(meeting => (
			<NokiaMeeting meeting={meeting} />
		))}
	</div>
)
