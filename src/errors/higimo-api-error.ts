/**
 * Ошибка в API бекенда хомяка
 */
export class ApiError extends Error {
	/**
	 * Код ошибки
	 */
	public status: number
	/**
	 * Запрашиваемый URL
	 */
	public url?: string
	/**
	 * JSON или текст вернувшиейся из API ошибки
	 */
	public response?: any

	constructor(message: string, status: number, url?: string, response?: any) {
		super(message)

		this.name = 'ApiError'
		this.status = status
		this.url = url
		this.response = response

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiError)
		}
	}

	public toJSON() {
		return {
			name: this.name,
			message: this.message,
			status: this.status,
			url: this.url,
			response: this.response,
			stack: this.stack
		}
	}
}
