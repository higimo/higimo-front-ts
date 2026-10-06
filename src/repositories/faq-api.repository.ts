import { FaqType } from 'api-types/faq.types'

import { sendRequest } from 'utils/api/send-request'

import { API_ROUTE } from 'dic/API_ROUTE'

class FaqApiRepository {
	async create(
		values: Omit<FaqType, 'id'>
	): Promise<FaqType | null> {
		const data = await sendRequest<FaqType>(API_ROUTE.faq, {
			method: 'POST',
			values: values
		})
		return data.data
	}

	async edit(
		values: Partial<FaqType>
	): Promise<FaqType | null> {
		const data = await sendRequest<FaqType>(API_ROUTE.faqSingle({ idcode: values.id || '' }), {
			method: 'PUT',
			values: values
		})
		return data.data
	}

	async delete(
		id: FaqType['id']
	): Promise<FaqType | null> {
		const data = await sendRequest<FaqType>(API_ROUTE.faqSingle({ idcode: id }), { method: 'DELETE' })
		return data.data
	}
}

export const faqApi = new FaqApiRepository()
