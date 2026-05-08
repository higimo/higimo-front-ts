import { getAuthPair } from 'utils/get-auth-pair'

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
	auth?: {
		login: string
		pass: string
	} | null
	values?: Record<string, any>
}

const sendRequest = <T = any>(
	url: string,
	{
		method = 'GET',
		auth = null,
		values = {}
	}: SendRequestOptions = {}
): Promise<T> => new Promise((resolve, reject) => {
	if (typeof window !== 'undefined') {
		var xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let json
				try {
					let jsonObj = JSON.parse(this.responseText)

					json = jsonObj.data
				} catch (e) {
					json = this.responseText
				}
				resolve(json)
			}
			if (this.readyState == 4 && this.status !== 200) {
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

		const { login, pass } = auth || getAuthPair()
		if (login && pass) {
			xhttp.setRequestHeader('Authorization', `Basic ${btoa(`${login}:${pass}`)}`)
		}

		xhttp.setRequestHeader('Accept', 'application/json')
		xhttp.setRequestHeader('Content-Type', method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded')

		xhttp.send(httpBuildQuery(values))
	}
})

export default sendRequest
