import { ApiRouteType } from 'dic/API_ROUTE'
import { KeyOf } from 'utils.type'
import { MetaApiType } from 'api-types/meta-api.types'
import { ValuesOptions } from 'api-types/request.type'

import { useCallback, useEffect, useReducer } from 'preact/hooks'

import { isDefaultSkipUrl } from 'utils/types/is-default-skip-url'
import { sendRequest } from 'utils/api/send-request'

import { API_STATUS } from 'dic/API_STATUS'

export type ApiStatusNameType = KeyOf<typeof API_STATUS>

export type ApiState<T, M = MetaApiType> = {
	status: ApiStatusNameType
	data: T | null
	meta?: M
	error?: Error
}

type ApiAction<T, M = MetaApiType> =
	| { type: 'INIT' }
	| { type: 'LOADING' }
	| { type: 'LOADED', payload: T | null, meta?: M }
	| { type: 'ERROR',  payload: Error }

const initialState = {
	status: API_STATUS.INIT,
	data: [],
	meta: undefined,
	error: undefined,
}

// TODO: [MIDDLE] мб, useState использовать?
// TODO: [MIDDLE] используется ещё в useJsonApi, useMultiJsonApi
export const apiReducer = <T, M = MetaApiType>(
	state: ApiState<T, M>,
	action: ApiAction<T, M>
): ApiState<T, M> => {
	switch (action.type) {
		case API_STATUS.INIT:
			return { ...state, status: API_STATUS.INIT }
		case API_STATUS.LOADING:
			return { ...state, status: API_STATUS.LOADING }
		case API_STATUS.LOADED:
			return { ...state, status: API_STATUS.LOADED, data: action.payload, meta: action.meta }
		case API_STATUS.ERROR:
			return { ...state, status: API_STATUS.ERROR, error: action.payload }
		default:
			throw new Error('Unknown action type')
	}
}

// Раскомментировать, чтоб посмотреть ошибки, должны быть только типа API_ROUTE.probbiSingle({ ... })
// мб, перестало работать
// type ApiUrlType = ValueOf<typeof API_ROUTE>
export type ApiUrlType = ApiRouteType

// TODO: [HIGH] написать аналог для использования репозиториями
// TODO: [HIGH] обычно возвращает MyApiType | null, когда пробрасываю дочкам надо проверять на null или EmptyData меня защитит без skipEmpty
export const useApi = <T, M = Object>(
	url: ApiUrlType,
	values: ValuesOptions = {}
): [ApiState<T, M>, () => void] => {
	const [state, dispatch] = useReducer(apiReducer<T, M>, initialState as ApiState<T, M>)

	const fetchData = useCallback(async () => {
		// TODO: [MIDDLE] кажется, надо добавить let cancelled = false
		try {
			dispatch({ type: API_STATUS.LOADING })
			if (isDefaultSkipUrl(url)) {
				// TOOD: не нравится, что здесь null, надо {}, чтоб меньше кода писать
				dispatch({ type: API_STATUS.LOADED, payload: null, meta: undefined })
			} else {
				const { data, meta } = await sendRequest<T, M>(url as string, { values })
				dispatch({ type: API_STATUS.LOADED, payload: data, meta })
			}
		} catch (error) {
			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
		}
	}, [url, JSON.stringify(values)])

	useEffect(() => {
		fetchData()
	}, [url, JSON.stringify(values)])

	return [state, fetchData]
}
