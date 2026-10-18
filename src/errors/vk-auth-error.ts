import { VkResponseError } from 'api-types/vk.types'

import { VkError } from 'errors/vk-error'

/**
 * Ошибки авторизации: невалидный токен, приложение выключено, неверный ключ доступа.
 * Коды: 5, 27, 28, 101.
 */
export class VkAuthError extends VkError {
	constructor(
		payload: VkResponseError['error'],
		context: {
			method: string
			params: Record<string, unknown>
		}
	) {
		super(payload, context)
		this.name = 'VkAuthError'
		Object.setPrototypeOf(this, VkAuthError.prototype)
	}
}
