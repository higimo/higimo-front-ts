import { API_ROUTE } from 'dic/api-route'
import { NokiaPersonApiType, NokiaRichMeetingType } from 'types'

import sendRequest from 'utils/send-request'

/**
 * Удаляет все пустые значения из объекта
 * Пустыми считаются: null, undefined, '', [], {}
 */
const compact = (obj) => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => {
			// Проверяем на null и undefined
			if (value == null) return false

			// Проверяем на пустую строку
			if (typeof value === 'string' && value.trim() === '') return false

			// Проверяем на пустой массив
			if (Array.isArray(value) && value.length === 0) return false

			// Проверяем на пустой объект
			if (typeof value === 'object' && !Array.isArray(value) && value.constructor === Object) {
				return Object.keys(value).length > 0
			}

			return true
		})
	)
}

/**
 * Исключает ключи из объекта
 */
const omit = (obj, ...keys) => {
	const keysToRemove = new Set(keys)
	return Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keysToRemove.has(key))
	)
}

export interface PersonApi {
	// getAll(): Promise<NokiaPersonApiType[]>
	// getById(id: string): Promise<NokiaPersonApiType>
	createOrUpdate(person: Partial<NokiaPersonApiType>): Promise<any>
}

export class PersonApiService implements PersonApi {
	// async getAll(): Promise<NokiaPersonApiType[]> {
	// 	const response = await sendRequest(API_ROUTE.nokiaPerson)
	// 	return response.data
	// }

	// async getById(id: string): Promise<NokiaPersonApiType> {
	// 	const response = await sendRequest(API_ROUTE.nokiaPersonSingle({ id }))
	// 	return response.data
	// }

	async createOrUpdate(person: Partial<NokiaPersonApiType>): Promise<any> {
		const method = person.id ? 'PUT' : 'POST'
		const endpoint = person.id
			? API_ROUTE.nokiaPersonSingle({ id: person.id.toString() })
			: API_ROUTE.nokiaPerson

		return sendRequest(endpoint, {
			method,
			values: compact(omit(person, 'id'))
		})
	}
}


export interface MeetingApi {
	// getAll(): Promise<NokiaRichMeetingType[]>
	// getById(id: string): Promise<NokiaRichMeetingType>
	createOrUpdate(meeting: Partial<NokiaRichMeetingType>): Promise<any>
	syncPerson(meetingId: number, persons: NokiaPersonApiType[]): Promise<any>
}

export class MeetingApiService implements MeetingApi {
	async createOrUpdate(meeting: Partial<NokiaRichMeetingType>): Promise<any> {
		console.log('MeetingApiService', meeting)
		const method = meeting.id ? 'PUT' : 'POST'
		const endpoint = meeting.id
			? API_ROUTE.nokiaMeetingSingle({ id: meeting.id.toString() })
			: API_ROUTE.nokiaMeeting

		return sendRequest(endpoint, {
			method,
			values: {
				...compact(omit(meeting, 'id')),
				date: new Date(meeting.date).getTime() / 1000,
			}
		})
	}

	async syncPerson(meetingId: number, persons: NokiaPersonApiType[]): Promise<any> {
		return sendRequest(
			API_ROUTE.nokiaSyncPersonForMeeting({ meetingId: meetingId.toString() }),
			{
				method: 'POST',
				values: {
					ids: persons.map(i => i.id)
				}
		})
	}
}
