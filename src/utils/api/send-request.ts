import httpBuildQuery from 'http-build-query'

declare global {
	interface ErrorConstructor {
		captureStackTrace(targetObject: object, constructorOpt?: Function): void;
	}
}

export class ApiError extends Error {
	public status: number
	public url?: string
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

	// Дополнительные методы если нужно
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

export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	values?: Record<string, any>
}

export interface ApiResponse<T = any> {
	data: T;
	meta?: any; // или более конкретный тип, если известен
}

const FREEZE_META = {} as const

const sendRequest = <T = any>(
	url: string,
	{
		method = 'GET',
		values = {}
	}: SendRequestOptions = {}
): Promise<ApiResponse<T>> => new Promise((resolve, reject) => {
	if (typeof window !== 'undefined') {
		var xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && [200, 201].includes(this.status)) {
				let json
				let meta
				try {
					let jsonObj = JSON.parse(this.responseText)

					json = jsonObj.data
					meta = jsonObj.meta || FREEZE_META
				} catch {
					json = this.responseText
				}
				resolve({ data: json, meta })
			}
			if (this.readyState == 4 && (this.status !== 200 && this.status !== 201)) {
				let errorData;
				let errorMessage = this.statusText;

				try {
					const parsedResponse = JSON.parse(this.responseText);
					errorData = parsedResponse;

					if (parsedResponse.message) {
						errorMessage = parsedResponse.message;
					} else if (parsedResponse.errors) {
						const errorMessages = Object.values(parsedResponse.errors).flat();
						errorMessage = errorMessages.join(', ');
					}
				} catch (e) {
					errorData = this.responseText;
				}

				const error = new ApiError(errorMessage, this.status, url, errorData);
				console.error(error, {
					status: this.status,
					url,
					errorData
				})
				reject(error)
			}
		}

		xhttp.open(
			method,
			(method === 'GET' ? url + (Object.keys(values).length ? '?' + httpBuildQuery(values) : '') : url),
			true
		)

		xhttp.setRequestHeader('Accept', 'application/json')
		xhttp.setRequestHeader('Content-Type', method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded')

		xhttp.send(httpBuildQuery(values))
	}
})

// TODO: [LIGHT] пора удалить
export default sendRequest
