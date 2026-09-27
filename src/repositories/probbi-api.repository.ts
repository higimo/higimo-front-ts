import { PetProjectType } from 'api-types/petproject.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

class ProbbiApiRepository {
	async create(
		values: Omit<PetProjectType, 'id'>
	): Promise<PetProjectType | null> {
		const data = await sendRequest<PetProjectType>(API_ROUTE.pinarik, {
			method: 'POST',
			values: values
		})
		return data.data
	}

	async edit(
		values: Partial<PetProjectType>
	): Promise<PetProjectType | null> {
		const data = await sendRequest<PetProjectType>(API_ROUTE.pinarikSingle({ id: values.id || '' }), {
			method: 'PUT',
			values: values
		})
		return data.data
	}

	async delete(
		id: PetProjectType['id']
	): Promise<PetProjectType | null> {
		const data = await sendRequest<PetProjectType>(API_ROUTE.pinarikSingle({ id }), { method: 'DELETE' })
		return data.data
	}
}

export const probbiApi = new ProbbiApiRepository()
