import { MessageApiType } from 'api-types/message.types'
import { NestedListItemType } from 'api-types/listlist.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

// TODO: [MIDDLE] Оборачивать бы в HigimoApiError и кидать наружу для тостов
// TODO: [MIDDLE] sendRequest сам консолит ошибку
class NestedListApiRepository {
	async create(
		values: Omit<NestedListItemType, 'id'>
	): Promise<NestedListItemType | null> {
		const data = await sendRequest<NestedListItemType>(API_ROUTE.lister, {
			method: 'POST',
			values: values,
		})
		return data.data
	}

	async edit(
		values: NestedListItemType
	): Promise<NestedListItemType | null> {
		const data = await sendRequest<NestedListItemType>(API_ROUTE.listerItemSingle({ id: values.id }), {
			method: 'PUT',
			values: values,
		})
		return data.data
	}

	async delete(
		id: NestedListItemType['id']
	): Promise<MessageApiType | null> {
		const data = await sendRequest<MessageApiType>(API_ROUTE.listerItemSingle({ id: id }), {
			method: 'DELETE',
		})
		return data.data
	}
}

export const nestedListApi = new NestedListApiRepository()
