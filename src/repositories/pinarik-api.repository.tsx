import { PinarikType } from 'api-types/pinarik.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

class PinarikApiRepository {
	async get(
		id: PinarikType['id']
	): Promise<PinarikType[] | null> {
		try {
			const data = await sendRequest<PinarikType[]>(API_ROUTE.pinarikSingle({ id }))
			return data.data
		} catch (error) {
			// TODO: [MIDDLE] что-то получше бы предоставить, тост хотя бы
			console.error(error)
			return null
		}
	}

	async create(
		values: Omit<PinarikType, 'id'>
	): Promise<PinarikType | null> {
		try {
			const data = await sendRequest<PinarikType>(API_ROUTE.pinarik, {
				method: 'POST',
				values: values
			})
			return data.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async edit(
		values: Partial<PinarikType>
	): Promise<PinarikType | null> {
		try {
			const data = await sendRequest<PinarikType>(API_ROUTE.pinarikSingle({ id: values.id || '' }), {
				method: 'PUT',
				values: values
			})
			return data.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async delete(
		id: PinarikType['id']
	): Promise<PinarikType | null> {
		try {
			const data = await sendRequest<PinarikType>(API_ROUTE.pinarikSingle({ id }), { method: 'DELETE' })
			return data.data
		} catch (error) {
			console.error(error)
			return null
		}
	}
}

export const pinarikApi = new PinarikApiRepository()
