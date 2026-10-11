import { FunctionComponent } from 'preact'
import { NokiaRichMeetingType } from 'api-types/nokia.types'

import { NokiaMeetingItem } from 'components/nokia/nokia-meeting-item'

// TODO: [ONE_CLASS_COMPONENT] прям отдельный компонент нужен? Мб, сделать общий с className

type NokiaMeetingListPropsType = {
	meetings: NokiaRichMeetingType[]
}

export const NokiaMeetingList: FunctionComponent<NokiaMeetingListPropsType> = ({ meetings }) => (
	<div className="meeting-gallery">
		{meetings.map(meeting => (
			<NokiaMeetingItem meeting={meeting} />
		))}
	</div>
)
