import { VkResponseError } from 'vendor/types'

import { vkApiCall } from 'utils/api/vk-api-call'
import { buildVkApiError } from 'utils/api/build-vk-api-error'

import { VkError } from 'errors/vk-error'

/**
 * Обёртка над вендорным `vkApiCall`.
 * Нормализует базовый `VkError` в конкретный подкласс через `buildVkApiError`.
 * Исходная ошибка сохраняется в `cause`.
 */
export const vkApiRequest = async <T>(
	method: string,
	params: Record<string, unknown>
): Promise<T> => {
	try {
		return await vkApiCall<T>(method, params)
	} catch (caught) {
		if (!(caught instanceof VkError)) {
			throw caught
		}

		if (caught.constructor !== VkError) {
			throw caught
		}

		throw buildVkApiError(
			{
				error_code: caught.error_code,
				error_msg: caught.error_msg,
				request_params: caught.request_params,
			} as VkResponseError['error'],
			{ method: caught.method, params: caught.params }
		)
	}
}
