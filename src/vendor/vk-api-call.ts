import { VkResponse } from 'vendor/types'

import { VKError } from '../errors/vk-error'

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
	throw new VKError(response.error, { method, params })
}
