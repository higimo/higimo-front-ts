import { HigimoApiError } from 'errors/higimo-api-error'

/**
 * Тело ответа сервера не удалось распарсить как JSON
 */
export class JsonParseError extends HigimoApiError {
	/**
	 * Сырой текст ответа
	 */
	public readonly rawBody: string

	constructor(
		message: string,
		status: number,
		url: string,
		rawBody: string,
	) {
		super(message, status, url, rawBody)
		this.name = 'JsonParseError'
		this.rawBody = rawBody
		Object.setPrototypeOf(this, JsonParseError.prototype)
	}
}
