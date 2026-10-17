import { HigimoApiError } from 'errors/higimo-api-error'

/**
 * Сеть недоступна, таймаут или запрос был прерван
 */
export class FetchError extends HigimoApiError {
	/**
	 * Исходная ошибка (обычно из fetch)
	 */
	public readonly cause?: unknown

	constructor(message: string, url?: string, cause?: unknown) {
		super(message, 0, url)
		this.name = 'FetchError'
		this.cause = cause
		// чтобы instanceof корректно работал после транспиляции в ES5
		Object.setPrototypeOf(this, FetchError.prototype)
	}
}
