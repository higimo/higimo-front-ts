import { API_ROUTE } from 'dic/API_ROUTE'
import { NokiaPersonSimpleType, NokiaRichMeetingType } from 'api-types/nokia.types'

import sendRequest from 'utils/send-request'

/**
 * Удаляет все пустые значения из объекта
 * Пустыми считаются: null, undefined, '', [], {}
 *
 * @param obj - Исходный объект
 * @returns Новый объект без пустых значений
 *
 * @example
 * compact({ a: 1, b: null, c: '', d: [], e: {} })
 * // Результат: { a: 1 }
 */
const compact = <T extends Record<string, any>>(obj: T): Partial<T> => {
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
	) as Partial<T>
}

/**
 * Исключает ключи из объекта
 *
 * @param obj - Исходный объект
 * @param keys - Ключи для исключения
 * @returns Новый объект без указанных ключей
 *
 * @example
 * const user = { id: 1, name: 'John', password: '123', email: 'john@example.com' }
 * const safeUser = omit(user, 'password')
 * // Результат: { id: 1, name: 'John', email: 'john@example.com' }
 *
 * @example
 * const data = { a: 1, b: 2, c: 3, d: 4 }
 * const result = omit(data, 'b', 'd')
 * // Результат: { a: 1, c: 3 }
 */
const omit = <T extends Record<string, any>, K extends keyof T>(
	obj: T,
	...keys: K[]
): Omit<T, K> => {
	const keysToRemove = new Set(keys)
	return Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keysToRemove.has(key as K))
	) as Omit<T, K>
}

export interface PersonApi {
	// getAll(): Promise<NokiaPersonApiType[]>
	// getById(id: string): Promise<NokiaPersonApiType>
	createOrUpdate(person: Partial<NokiaPersonSimpleType>): Promise<any>
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

	async createOrUpdate(person: Partial<NokiaPersonSimpleType>): Promise<any> {
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
	syncPerson(meetingId: number, persons: NokiaPersonSimpleType[]): Promise<any>
}

export class MeetingApiService implements MeetingApi {
	async createOrUpdate(meeting: Partial<NokiaRichMeetingType>): Promise<any> {
		console.log('MeetingApiService.createOrUpdate', meeting)
		const method = meeting.id ? 'PUT' : 'POST'
		const endpoint = meeting.id
			? API_ROUTE.nokiaMeetingSingle({ id: meeting.id.toString() })
			: API_ROUTE.nokiaMeeting

		return sendRequest(endpoint, {
			method,
			values: compact(omit(meeting, 'id'))
		})
	}

	async syncPerson(meetingId: number, persons: NokiaPersonSimpleType[]): Promise<any> {
		console.log('MeetingApiService.createOrUpdate', persons)
		return sendRequest(
			API_ROUTE.nokiaSyncPersonForMeeting({ meetingId: meetingId.toString() }),
			{
				method: 'POST',
				values: {
					person_ids: persons.map(i => i.id)
				}
		})
	}
}
