import { getAuthPair } from 'utils/get-auth-pair'

import httpBuildQuery from 'http-build-query'

export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
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
				const error = new Error(`HTTP ${this.status}: ${this.statusText || 'Request failed'}`)
				error.name = 'ApiError'
				console.error(error, {
					status: this.status,
					response: this.responseText,
					url,
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
