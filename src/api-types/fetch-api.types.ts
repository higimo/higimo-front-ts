import { KeyOf } from 'utils.type'

import { API_STATUS } from 'dic/API_STATUS'

/**
 * Статусы запросов к бекенду
 */
export type ApiStatusNameType = KeyOf<typeof API_STATUS>

/**
 * Содержимое контракта стейта запросов к бекенду
 */
export type ApiState<T, M = MetaApiType> = {
	status: ApiStatusNameType
	data: T | null
	meta?: M
	error?: Error
	/**
	 * true, пока идёт фоновая перезагрузка при уже имеющихся данных (stale-while-revalidate)
	 */
	isRevalidating?: boolean
}

/**
 * Экшены обновления стейта запросов к бекенду
 */
export type ApiAction<T, M = MetaApiType> =
	/** полный сброс — используется в т.ч. при смене url/values */
	| { type: 'INIT' }
	| { type: 'LOADING' }
	/** Перезагрузка данных, чтобы продолжать показывать старое, а не мерцать экраном */
	| { type: 'REVALIDATE' }
	| { type: 'LOADED', payload: T | null, meta?: M }
	| { type: 'ERROR',  payload: Error }

/**
 * Сообщение с хомяка, обычно об удалении
 */
export type MessageApiType = {
	message: string
}

/**
 * Значения параметров запроса к бекенду
 */
export interface ValuesOptions {
	[key: string]: string | number | null | ValuesOptions | string[]
}

/**
 * Опции запросов к бекенду
 */
export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	values?: ValuesOptions
	signal?: AbortSignal
}

/**
 * meta тип, который иногда присылает бененд
 */
export type MetaApiType = Record<string, unknown>

/**
 * Ответы бекенда
 */
export interface ApiResponse<T, M = MetaApiType> {
	data: T
	meta?: M
}
