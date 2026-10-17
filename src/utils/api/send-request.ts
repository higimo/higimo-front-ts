import { ApiResponse, MetaApiType, SendRequestOptions, ValuesOptions } from 'api-types/fetch-api.types'

import httpBuildQuery from 'http-build-query'
import { parseJson } from 'utils/parse-json'
import { extractEnvelope } from 'utils/api/extract-envelope'
import { buildApiError } from 'utils/api/build-api-error'
import { FetchError } from 'errors/fetch-error'
import { JsonParseError } from 'errors/json-parse-error'

declare global {
	interface ErrorConstructor {
		captureStackTrace(targetObject: object, constructorOpt?: Function): void
	}
}

export const sendRequest = async <T = unknown, M = MetaApiType>(
	url: string,
	{
		method = 'GET',
		values = {},
		signal,
	}: SendRequestOptions = {}
): Promise<ApiResponse<T, M>> => {
	if (typeof window === 'undefined') {
		throw new Error('sendRequest работает только в браузере')
	}

	// формируем запрос
	let fullUrl = url
	let body: ValuesOptions

	if (method === 'GET') {
		if (Object.keys(values).length) {
			// @ts-ignore он жуёт { filter: { key: 'my' } }, но ругается типом
			fullUrl = `${url}?${httpBuildQuery(values)}`
		}
	} else {
		// @ts-ignore
		body = httpBuildQuery(values)
	}

	// Отправляем запрос
	let response: Response
	try {
		response = await fetch(fullUrl, {
			method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': method === 'GET'
					? 'application/json'
					: 'application/x-www-form-urlencoded'
			},
			// @ts-ignore
			body,
			signal,
		})
	} catch (error) {
		// AbortController — это не ошибка сети, пробрасываем как есть
		if (error instanceof DOMException && error.name === 'AbortError') {
			throw error
		}
		throw new FetchError(
			error instanceof Error ? error.message : 'Сетевая ошибка',
			url,
		)

	}

	// Парсим ответ
	const responseText = await response.text()
	const parsed = parseJson(responseText)

	if (response.ok) {
		return extractEnvelope<T, M>(parsed, responseText)
	}

	// Ответ ожидался как JSON, но не распарсился — сигналим отдельным типом
	const contentType = response.headers.get('content-type') ?? ''
	const isJsonExpected = contentType.includes('application/json')
	if (isJsonExpected && responseText.trim() && parsed === undefined) {
		throw new JsonParseError(
			'Не удалось распарсить JSON из ответа',
			response.status,
			url,
			responseText
		)
	}

	// в потребителе ApiError.response для текстов ошибок полей
	throw buildApiError(response, parsed, responseText, url)
}
