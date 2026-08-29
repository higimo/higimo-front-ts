import httpBuildQuery from 'http-build-query'

import { useCallback } from 'preact/hooks'

import { formatResponse } from 'components/admin-tool/utils/formatResponse'

import { HEADERS } from 'components/admin-tool/HEADERS'

export const useApiRequest = () => {
	const sendRequest = useCallback((
		method: string,
		uri: string,
		options: Record<string, any>
	): Promise<string> => {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			const url = `/api/v2/${uri}`

			xhr.onreadystatechange = () => {
				if (xhr.readyState !== 4) return

				if (xhr.status === 200) {
					resolve(formatResponse(xhr.responseText))
				} else {
					reject(new Error(`Request failed: ${xhr.status}`))
				}
			}

			xhr.open(method, url, true)

			const headers = method === 'GET' ? HEADERS.GET : HEADERS.DEFAULT
			Object.entries(headers).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value)
			})

			const body = method === 'GET'
				? undefined
				: httpBuildQuery(options)

			xhr.send(body as any)
		})
	}, [])

	return { sendRequest }
}
