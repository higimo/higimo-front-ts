import { API_STATUS } from "dic/API_STATUS"
import { KeyOf } from "utils.type"

export type MetaApiType = Record<string, unknown>

export type ApiStatusNameType = KeyOf<typeof API_STATUS>

export type ApiState<T, M = MetaApiType> = {
	status: ApiStatusNameType
	data: T | null
	meta?: M
	error?: Error
}

export type ApiAction<T, M = MetaApiType> =
	| { type: 'INIT' }
	| { type: 'LOADING' }
	| { type: 'LOADED', payload: T | null, meta?: M }
	| { type: 'ERROR',  payload: Error }
