import { LibraryType } from 'api-types/library.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

class LibApiRepository {
	async getAll(): Promise<LibraryType[] | null> {
		const data = await sendRequest<LibraryType[]>(API_ROUTE.lib)
		return data.data
	}

	async create(
		values: Omit<LibraryType, 'id'>
	): Promise<LibraryType | null> {
		const data = await sendRequest<LibraryType>(API_ROUTE.lib, {
			method: 'POST',
			values: values
		})
		return data.data
	}

	// async edit(
	// 	values: Partial<LibraryType>
	// ): Promise<LibraryType | null> {
	// 	const data = await sendRequest<LibraryType>(API_ROUTE.libSingle({ id: values.id }), {
	// 		method: 'PUT',
	// 		values: values
	// 	})
	// 	return data.data
	// }

	// async delete(
	// 	id: LibraryType['id']
	// ): Promise<LibraryType | null> {
	// 	const data = await sendRequest<LibraryType>(API_ROUTE.libSingle({ id }), { method: 'DELETE' })
	// 	return data.data
	// }
}

export const libApi = new LibApiRepository()
