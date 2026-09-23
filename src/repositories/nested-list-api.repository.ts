import { MessageApiType } from 'api-types/message.types'
import { NestedListItemType } from 'api-types/listlist.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

class NestedListApiRepository {
	async create(
		values: Omit<NestedListItemType, 'id'>
	): Promise<NestedListItemType | null> {
		try {
			const data = await sendRequest<NestedListItemType>(API_ROUTE.lister, {
				method: 'POST',
				values: values,
			})
			return data.data
		} catch (error) {
			// TODO: [LIGHT] Оборачивать бы в HigimoApiError и кидать наружу для тостов
			console.error(error)
			return null
		}
	}

	async edit(
		values: NestedListItemType
	): Promise<NestedListItemType | null> {
		try {
			const data = await sendRequest<NestedListItemType>(API_ROUTE.listerItemSingle({ id: values.id?.toString() }), {
				method: 'PUT',
				values: values,
			})
			return data.data
		} catch (error) {
			console.error(error)
			return null
		}
	}

	async delete(
		id: NestedListItemType['id']
	): Promise<MessageApiType | null> {
		try {
			const data = await sendRequest<MessageApiType>(API_ROUTE.listerItemSingle({ id: id.toString() }), {
				method: 'DELETE',
			})
			return data.data
		} catch (error) {
			console.error(error)
			return null
		}
	}
}

export const nestedListApi = new NestedListApiRepository()
