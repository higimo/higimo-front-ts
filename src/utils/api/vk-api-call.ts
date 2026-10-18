import { VkResponse } from 'vendor/types'

import { buildVkApiError } from 'utils/api/build-vk-api-error'

export const vkApiCall = async <T,>(
	method: string,
	params: Record<string, unknown>
): Promise<T> => {
	const response = await new Promise<VkResponse<T>>((resolve) => {
		VK.Api.call(method, params, resolve)
	})
	if ('response' in response) {
		return response as T
	}

	throw buildVkApiError(response.error, { method, params })
}
