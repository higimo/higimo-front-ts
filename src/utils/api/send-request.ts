import { ApiError } from 'errors/higimo-api-error'

import httpBuildQuery from 'http-build-query'

declare global {
	interface ErrorConstructor {
		captureStackTrace(targetObject: object, constructorOpt?: Function): void
	}
}

export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	values?: Record<string, any>
}

export interface ApiResponse<T = any> {
	data: T
	meta?: any // или более конкретный тип, если известен
}

const FREEZE_META = {} as const

const parseJson = (text: string): any => {
	try {
		return JSON.parse(text)
	} catch {
		return undefined
	}
}

export const sendRequest = async <T = any>(
	url: string,
	{
		method = 'GET',
		values = {}
	}: SendRequestOptions = {}
): Promise<ApiResponse<T>> => {
	if (typeof window === 'undefined') {
		throw new Error('sendRequest is only available in browser environment')
	}

	const query = httpBuildQuery(values)
	const fullUrl = method === 'GET' && Object.keys(values).length
		? `${url}?${query}`
		: url

	const response = await fetch(fullUrl, {
		method,
		headers: {
			'Accept': 'application/json',
			'Content-Type': method === 'GET'
				? 'application/json'
				: 'application/x-www-form-urlencoded'
		},
		body: method === 'GET' ? undefined : query
	})

	const responseText = await response.text()
	const parsed = parseJson(responseText)

	if ([200, 201].includes(response.status)) {
		const json = parsed !== undefined && typeof parsed === 'object' && 'data' in parsed
			? parsed.data as T
			: responseText as unknown as T
		const meta = parsed?.meta || FREEZE_META

		return { data: json, meta }
	}

	let errorMessage = response.statusText
	const errorData = parsed !== undefined ? parsed : responseText

	if (parsed?.message) {
		errorMessage = parsed.message
	} else if (parsed?.errors) {
		const errorMessages = Object.values(parsed.errors).flat()
		errorMessage = errorMessages.join(', ')
	}

	// TODO: [HARD] мб, разделять типы ошибок:
	// JsonParse, FetchError (сеть потеряна, таймаут), ServerFail (5**), PolicyFail (4**), ValidationFail (422, 400),
	// мб их ловить в ErrorBoundary, раз он в роутере всё равно перехватывает их, бизнес-логику обрабатывать в компонентах
	const error = new ApiError(errorMessage, response.status, url, errorData)
	console.error(error, {
		status: response.status,
		url,
		errorData
	})
	throw error
}
