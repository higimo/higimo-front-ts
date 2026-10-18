import { VkResponseError } from 'api-types/vk.types'

import { VkError } from 'errors/vk-error'

/**
 * Неверные параметры запроса, неизвестный метод, неверный ID.
 * Коды: 3, 8, 100, 113, 150.
 */
export class VkValidationError extends VkError {
	constructor(
		payload: VkResponseError['error'],
		context: {
			method: string
			params: Record<string, unknown>
		},
	) {
		super(payload, context)
		this.name = 'VkValidationError'
		Object.setPrototypeOf(this, VkValidationError.prototype)
	}
}
