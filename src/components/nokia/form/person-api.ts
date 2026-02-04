import { API_ROUTE } from 'dic/api-route'
import { NewNokiaMicroPersonType } from 'types'

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
	// getAll(): Promise<NewNokiaMicroPersonType[]>
	// getById(id: string): Promise<NewNokiaMicroPersonType>
	createOrUpdate(person: Partial<NewNokiaMicroPersonType>): Promise<any>
}

export class PersonApiService implements PersonApi {
	// async getAll(): Promise<NewNokiaMicroPersonType[]> {
	// 	const response = await sendRequest(API_ROUTE.nokiaPerson)
	// 	return response.data
	// }

	// async getById(id: string): Promise<NewNokiaMicroPersonType> {
	// 	const response = await sendRequest(API_ROUTE.nokiaPersonSingle({ id }))
	// 	return response.data
	// }

	async createOrUpdate(person: Partial<NewNokiaMicroPersonType>): Promise<any> {
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
