import { VkResponseError } from 'vendor/types'

export class VKError extends Error {
	readonly error_code: number
	readonly error_msg: string
	readonly request_params: Record<string, unknown>
	readonly method: string
	readonly params: Record<string, unknown>

	constructor(
		payload: VkResponseError['error'],
		context: {
			method: string
			params: Record<string, unknown>
		}
	) {
		super(payload.error_msg)

		this.name = 'VKError'

		this.error_code = payload.error_code
		this.error_msg = payload.error_msg
		this.request_params = payload.request_params
		this.method = context.method
		this.params = context.params

		// чтобы instanceof корректно работал после транспиляции в ES5
		Object.setPrototypeOf(this, VKError.prototype)
	}
}
