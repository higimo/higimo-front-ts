import { VkResponseError } from 'api-types/vk.types'

import { VkError } from 'errors/vk-error'

/**
 * Нет прав на действие или доступ к контенту запрещён.
 * Коды: 7, 15, 18, 20, 21, 30, 200, 201, 203.
 */
export class VkAccessError extends VkError {
	constructor(
		payload: VkResponseError['error'],
		context: {
			method: string
			params: Record<string, unknown>
		},
	) {
		super(payload, context)
		this.name = 'VkAccessError'
		Object.setPrototypeOf(this, VkAccessError.prototype)
	}
}
