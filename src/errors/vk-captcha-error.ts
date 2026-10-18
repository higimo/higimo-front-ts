import { VkResponseError } from 'api-types/vk.types'

import { VkError } from 'errors/vk-error'

/**
 * Требуется ввод капчи (код 14).
 */
export class VkCaptchaError extends VkError {
	/** URL картинки с капчей, если пришёл */
	readonly captcha_img?: string
	/** SID капчи для последующего ввода */
	readonly captcha_sid?: string

	constructor(payload: VkResponseError['error'], context: { method: string; params: Record<string, unknown> }) {
		super(payload, context)
		this.name = 'VkCaptchaError'
		const raw = payload as unknown as Record<string, unknown>
		this.captcha_img = typeof raw.captcha_img === 'string' ? raw.captcha_img : undefined
		this.captcha_sid = typeof raw.captcha_sid === 'string' ? raw.captcha_sid : undefined
		Object.setPrototypeOf(this, VkCaptchaError.prototype)
	}
}
