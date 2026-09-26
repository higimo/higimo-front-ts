import { PinarikType } from 'api-types/pinarik.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

// TODO: [MIDDLE] Надо научиться работать с ошибками, здесь или в каждом компоненте
class PinarikApiRepository {
	async get(
		id: PinarikType['id']
	): Promise<PinarikType[] | null> {
		const data = await sendRequest<PinarikType[]>(API_ROUTE.pinarikSingle({ id }))
		return data.data
	}

	async create(
		values: Omit<PinarikType, 'id'>
	): Promise<PinarikType | null> {
		const data = await sendRequest<PinarikType>(API_ROUTE.pinarik, {
			method: 'POST',
			values: values
		})
		return data.data
	}

	async edit(
		values: Partial<PinarikType>
	): Promise<PinarikType | null> {
		const data = await sendRequest<PinarikType>(API_ROUTE.pinarikSingle({ id: values.id || '' }), {
			method: 'PUT',
			values: values
		})
		return data.data
	}

	async delete(
		id: PinarikType['id']
	): Promise<PinarikType | null> {
		const data = await sendRequest<PinarikType>(API_ROUTE.pinarikSingle({ id }), { method: 'DELETE' })
		return data.data
	}
}

export const pinarikApi = new PinarikApiRepository()
