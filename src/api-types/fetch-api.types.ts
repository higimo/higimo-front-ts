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
}

/**
 * Экшены обновления стейта запросов к бекенду
 */
export type ApiAction<T, M = MetaApiType> =
	| { type: 'INIT' }
	| { type: 'LOADING' }
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
	[key: string]: string | number | null | ValuesOptions | string[];
}

/**
 * Опции запросов к бекенду
 */
export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	values?: ValuesOptions;
}

/**
 * meta тип, который иногда присылает бененд
 */
export type MetaApiType = Record<string, unknown>

/**
 * Ответы бекенда
 */
export interface ApiResponse<T, M = MetaApiType> {
	data: T;
	meta?: M;
}
