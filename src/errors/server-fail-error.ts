import { LaravelErrorBody } from 'api-types/fetch-api.types'

import { HigimoApiError } from 'errors/higimo-api-error'

/**
 * 5xx — сервер не смог обработать запрос
 */
export class ServerFailError extends HigimoApiError {
	constructor(
		message: string,
		status: number,
		url: string,
		response?: LaravelErrorBody | string,
	) {
		super(message, status, url, response)
		this.name = 'ServerFailError'
		Object.setPrototypeOf(this, ServerFailError.prototype)
	}
}
