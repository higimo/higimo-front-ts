import { VkResponseError } from 'api-types/vk.types'

import { VkError } from 'errors/vk-error'

/**
 * Слишком много запросов или однотипных действий.
 * Коды: 6, 9, 29.
 */
export class VkRateLimitError extends VkError {
	constructor(
		payload: VkResponseError['error'],
		context: {
			method: string
			params: Record<string, unknown>
		},
	) {
		super(payload, context)
		this.name = 'VkRateLimitError'
		Object.setPrototypeOf(this, VkRateLimitError.prototype)
	}
}
