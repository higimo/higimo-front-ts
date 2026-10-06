import { ApiError, LaravelErrorBody } from 'errors/higimo-api-error'

import httpBuildQuery from 'http-build-query'
import { parseJson } from 'utils/parse-json'

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

// TODO: [LIGHT] вынести в utils/type
const isObject = (v: unknown): v is Record<string, unknown> =>
	typeof v === 'object' && v !== null && !Array.isArray(v)

const isEnvelope = (v: unknown): v is { data: unknown; meta?: unknown } =>
	isObject(v) && 'data' in v

const isLaravelErrorBody = (v: unknown): v is LaravelErrorBody =>
	isObject(v) && typeof v.message === 'string'





// TODO: [LIGHT] вынести в utils/fetch
/**
 * Достаёт `data` из конверта Laravel `{ data: ... }`.
 * Если конверта нет — возвращает то, что распарсилось (или сырой текст).
 */
const extractEnvelope = <T, M>(
	parsed: unknown,
	text: string
): ApiResponse<T, M> => {
	if (isEnvelope(parsed)) {
		const envelope = parsed as { data: T; meta?: M }
		return envelope.meta !== undefined
			? { data: envelope.data, meta: envelope.meta }
			: { data: envelope.data }
	}

	if (parsed !== undefined) {
		return { data: parsed as T }
	}

	return { data: text as unknown as T }
}


// TODO: [LIGHT] вынести в utils/fetch
const buildApiError = (
	response: Response,
	parsed: unknown,
	text: string,
	url: string
): ApiError => {
	if (isLaravelErrorBody(parsed)) {
		return new ApiError(parsed.message, response.status, url, parsed)
	}

	return new ApiError(
		response.statusText || `HTTP ${response.status}`,
		response.status,
		url,
		text
	)
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

	// TODO: [HARD] мб, разделять типы ошибок:
	// JsonParse, FetchError (сеть потеряна, таймаут), ServerFail (5**), PolicyFail (4**), ValidationFail (422, 400),
	// мб их ловить в ErrorBoundary, раз он в роутере всё равно перехватывает их, бизнес-логику обрабатывать в компонентах

	// в потребителе ApiError.response для текстов ошибок полей
	throw buildApiError(response, parsed, responseText, url)
}
