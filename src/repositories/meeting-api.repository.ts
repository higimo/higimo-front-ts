import { NokiaRichMeetingType, NokiaPersonSimpleType } from 'api-types/nokia.types'

import { sendRequest } from 'utils/api/send-request'
import { compact, omit } from './person-api'

import { API_ROUTE } from 'dic/API_ROUTE'

export interface MeetingApi {
	// getAll(): Promise<NokiaRichMeetingType[]>
	// getById(id: string): Promise<NokiaRichMeetingType>
	createOrUpdate(meeting: Partial<NokiaRichMeetingType>): Promise<any>
	syncPerson(meetingId: number, persons: NokiaPersonSimpleType[]): Promise<any>
}

export class MeetingApiRepository implements MeetingApi {
	async createOrUpdate(meeting: Partial<NokiaRichMeetingType>): Promise<any> {
		console.log('MeetingApiService.createOrUpdate', meeting)
		const method = meeting.id ? 'PUT' : 'POST'
		const endpoint = meeting.id
			? API_ROUTE.nokiaMeetingSingle({ id: meeting.id })
			: API_ROUTE.nokiaMeeting

		return sendRequest(endpoint, {
			method,
			values: compact(omit(meeting, 'id'))
		})
	}

	async syncPerson(meetingId: number, persons: NokiaPersonSimpleType[]): Promise<any> {
		console.log('MeetingApiService.createOrUpdate', persons)
		return sendRequest(
			API_ROUTE.nokiaSyncPersonForMeeting({ meetingId: meetingId }),
			{
				method: 'POST',
				values: {
					person_ids: persons.map(i => i.id)
				}
			})
	}
}
