import { LaravelErrorBody } from 'api-types/fetch-api.types'

import { HigimoApiError } from 'errors/higimo-api-error'

/**
 * 400, 422 — ошибки валидации входных данных
 */
export class ValidationFailError extends HigimoApiError {
	/**
	 * Ошибки по полям от Laravel — удобный доступ без обхода response
	 */
	public readonly errors?: Record<string, string[]>

	constructor(
		message: string,
		status: number,
		url: string,
		response?: LaravelErrorBody | string,
	) {
		super(message, status, url, response)
		this.name = 'ValidationFailError'
		this.errors = typeof response === 'object' && response !== null
			? response.errors
			: undefined
		Object.setPrototypeOf(this, ValidationFailError.prototype)
	}
}
