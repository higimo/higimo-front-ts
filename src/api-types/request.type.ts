import { MetaApiType } from 'api-types/fetch-api.types'

// TODO: [HARD] наверно, не в api-types должно лежать

export interface ValuesOptions {
	[key: string]: string | number | null | ValuesOptions | string[];
}

export interface SendRequestOptions {
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	values?: ValuesOptions;
}

export interface ApiResponse<T, M = MetaApiType> {
	data: T;
	meta?: M;
}
