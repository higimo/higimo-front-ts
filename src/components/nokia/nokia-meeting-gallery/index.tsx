import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType } from 'api-types/nokia.types'

import { NokiaMeeting } from 'components/nokia/nokia-meeting'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

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
