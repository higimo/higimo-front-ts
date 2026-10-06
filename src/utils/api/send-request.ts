
import httpBuildQuery from 'http-build-query'
import { parseJson } from 'utils/parse-json'
import { extractEnvelope } from 'utils/api/extract-envelope'
import { buildApiError } from 'utils/api/build-api-error'

declare global {
	interface ErrorConstructor {
		captureStackTrace(targetObject: object, constructorOpt?: Function): void
	}
}

export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	values?: Record<string, string | number | null>
}

export interface ApiResponse<T, M = Record<string, unknown>> {
	data: T
	meta?: M
}

export const sendRequest = async <T = unknown, M = Record<string, unknown>>(
	url: string,
	{
		method = 'GET',
		values = {}
	}: SendRequestOptions = {}
): Promise<ApiResponse<T, M>> => {
	if (typeof window === 'undefined') {
		throw new Error('sendRequest работает только в браузере')
	}

	// формируем запрос
	let fullUrl = url
	let body: string | undefined

	if (method === 'GET') {
		if (Object.keys(values).length) {
			fullUrl = `${url}?${httpBuildQuery(values)}`
		}
	} else {
		body = httpBuildQuery(values)
	}

	// Отправляем запрос
	const response = await fetch(fullUrl, {
		method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': method === 'GET'
				? 'application/json'
				: 'application/x-www-form-urlencoded'
		},
		body,
	})

	// Парсим ответ
	const responseText = await response.text()
	const parsed = parseJson(responseText)


	if (response.ok) {
		return extractEnvelope<T, M>(parsed, responseText)
	}

	// в потребителе ApiError.response для текстов ошибок полей
	throw buildApiError(response, parsed, responseText, url)
}
