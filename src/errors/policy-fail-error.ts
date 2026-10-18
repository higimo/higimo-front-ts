import { HigimoApiError, LaravelErrorBody } from 'errors/higimo-api-error'

/**
 * 401, 403, 404, 405 и прочие 4xx (кроме 400/422) — нарушение правил/политик
 */
export class PolicyFailError extends HigimoApiError {
	constructor(
		message: string,
		status: number,
		url: string,
		response?: LaravelErrorBody | string,
	) {
		super(message, status, url, response)
		this.name = 'PolicyFailError'
		Object.setPrototypeOf(this, PolicyFailError.prototype)
	}
}
