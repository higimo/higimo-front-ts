import { MessageApiType } from 'api-types/message.types'
import { NestedListItemType } from 'api-types/listlist.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

// TODO: [HARD] checkFail(data.data) и кидать HigimoApiError для тостов или guard-type
// TODO: [HARD] sendRequest сам консолит ошибку
// TODO: [HARD] Надо научиться работать с ошибками, здесь или в каждом компоненте
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
