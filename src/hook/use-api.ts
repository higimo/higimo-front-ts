import { useEffect, useReducer } from 'preact/hooks'

import sendRequest from 'utils/send-request'
import { ApiRouteType } from 'dic/api-route'

export const API_STATUS = {
	INIT:    'INIT',
	LOADING: 'LOADING',
	LOADED:  'LOADED',
	ERROR:   'ERROR',
} as const

export type ApiStatusNameType = keyof typeof API_STATUS
export type ApiStatusValueType = typeof API_STATUS[keyof typeof API_STATUS]

type ApiState<T> = {
	status: ApiStatusNameType
	data: T
	error?: Error
}

type ApiAction<T> =
	| { type: 'INIT' }
	| { type: 'LOADING' }
	| { type: 'LOADED'; payload: T }
	| { type: 'ERROR';  payload: Error }

const initialState = {
	status: API_STATUS.INIT,
	data: [],
}

const apiReducer = <T,>(state: ApiState<T>, action: ApiAction<T>): ApiState<T> => {
	switch (action.type) {
		case API_STATUS.INIT:
			return { ...state, status: 'INIT' }
		case API_STATUS.LOADING:
			return { ...state, status: 'LOADING' }
		case API_STATUS.LOADED:
			return { ...state, status: 'LOADED', data: action.payload }
		case API_STATUS.ERROR:
			return { ...state, status: 'LOADED', error: action.payload }
		default:
			throw new Error('Unknown action type')
	}
}

// Раскомментировать, чтоб посмотреть ошибки, должны быть только типа API_ROUTE.probbiSingle({ ... })
// type ApiUrlType = typeof API_ROUTE[keyof typeof API_ROUTE]
type ApiUrlType = ApiRouteType

// TODO: [MEDIUM] Добавить ещё POST, DELETE
// TODO: [MEDIUM] Добавить вывод сразу useLoadingState
// TODO: [MEDIUM] что если пользоваться ServiceApi, в дополнение к простым строчкам?
const useApi = <T,>(url: ApiUrlType, values: Record<string, any> = {}): [ApiState<T>, () => void] => {
	const [state, dispatch] = useReducer(apiReducer<T>, initialState as ApiState<T>)

	const fetchData = async () => {
		try {
			dispatch({ type: API_STATUS.LOADING })
			const data: T = await sendRequest(url as string, { values })
			dispatch({ type: API_STATUS.LOADED, payload: data })
		} catch (error) {
			dispatch({ type: API_STATUS.ERROR, payload: error as Error })
		}
	}

	useEffect(() => {
		fetchData()
	}, [url, JSON.stringify(values)])

	return [state, fetchData]
}

export default useApi
