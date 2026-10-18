import { VkResponseError } from 'api-types/vk.types'

import { VkError } from 'errors/vk-error'

/**
 * Внутренняя ошибка VK, повторите позже.
 * Коды: 1, 10.
 */
export class VkServerError extends VkError {
	constructor(payload: VkResponseError['error'], context: { method: string; params: Record<string, unknown> }) {
		super(payload, context)
		this.name = 'VkServerError'
		Object.setPrototypeOf(this, VkServerError.prototype)
	}
}
