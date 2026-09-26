import { NokiaPersonSimpleType } from 'api-types/nokia.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

export class PersonApiRepository {
	async create(
		values: Omit<NokiaPersonSimpleType, 'id'>
	): Promise<NokiaPersonSimpleType | null> {
		const data = await sendRequest<NokiaPersonSimpleType>(API_ROUTE.nokiaPerson, {
			method: 'POST',
			values: values
		})
		return data.data
	}

	async edit(
		values: NokiaPersonSimpleType
	): Promise<NokiaPersonSimpleType | null> {
		const data = await sendRequest<NokiaPersonSimpleType>(API_ROUTE.nokiaPersonSingle({ id: values.id }), {
			method: 'PUT',
			values: values
		})
		return data.data
	}

	async delete(
		id: NokiaPersonSimpleType['id']
	): Promise<NokiaPersonSimpleType | null> {
		const data = await sendRequest<NokiaPersonSimpleType>(API_ROUTE.nokiaPersonSingle({ id: id }), {
			method: 'DELETE',
		})
		return data.data
	}
}

export const personApi = new PersonApiRepository()
