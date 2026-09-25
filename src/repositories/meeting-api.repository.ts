import { MessageApiType } from 'api-types/message.types'
import { NokiaPersonSimpleType, NokiaMeetingSimpleType } from 'api-types/nokia.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

// export interface MeetingApi {
// 	// getAll(): Promise<NokiaRichMeetingType[]>
// 	// getById(id: string): Promise<NokiaRichMeetingType>
// 	createOrUpdate(meeting: Partial<NokiaRichMeetingType>): Promise<any>
// 	syncPerson(meetingId: number, persons: NokiaPersonSimpleType[]): Promise<any>
// }

class MeetingApiRepository {
	async create(
		values: Omit<NokiaMeetingSimpleType, 'id'>
	): Promise<NokiaMeetingSimpleType | null> {
		// TODO: вынести бы в отдельный метод заполнения и возвращать значение
		let newValue = Object.assign({}, values)
		if (!values.date_start.length) {
			// @ts-ignore
			newValue.date_start = values.date + 'T12:00'
		}
		if (!values.date_end.length) {
			// @ts-ignore
			newValue.date_end = values.date + 'T13:00'
		}
		const data = await sendRequest<NokiaMeetingSimpleType>(API_ROUTE.nokiaMeeting, {
			method: 'POST',
			values: newValue
		})
		return data.data
	}

	async edit(
		values: Partial<NokiaMeetingSimpleType>
	): Promise<NokiaMeetingSimpleType | null> {
		const data = await sendRequest<NokiaMeetingSimpleType>(
			API_ROUTE.nokiaMeetingSingle({ id: values.id || '' }),
			{
				method: 'PUT',
				values: values
			}
		)
		return data.data
	}

	async delete(id: NokiaMeetingSimpleType['id']): Promise<MessageApiType | null> {
		const data = await sendRequest<MessageApiType>(API_ROUTE.nokiaMeetingSingle({ id }), {
				method: 'DELETE',
		})
		return data.data
	}

	async syncPerson(
		meetingId: NokiaMeetingSimpleType['id'],
		persons: NokiaPersonSimpleType[]
	): Promise<any | null> {
		try {
			// TODO: что он возвращает?
			// TODO: [BACKEND] сейчас этот эндпоинт отключён
			return sendRequest(
				API_ROUTE.nokiaSyncPersonForMeeting({ meetingId: meetingId }),
				{
					method: 'POST',
					values: {
						person_ids: persons.map(i => i.id)
					}
				})
		} catch (error) {
			return null
		}
	}

	// async createOrUpdate(meeting: Partial<NokiaRichMeetingType>): Promise<any> {
	// 	console.log('MeetingApiService.createOrUpdate', meeting)
	// 	const method = meeting.id ? 'PUT' : 'POST'
	// 	const endpoint = meeting.id
	// 		? API_ROUTE.nokiaMeetingSingle({ id: meeting.id })
	// 		: API_ROUTE.nokiaMeeting

	// 	return sendRequest(endpoint, {
	// 		method,
	// 		values: compact(omit(meeting, 'id'))
	// 	})
	// }
}

export const meetingApi = new MeetingApiRepository()
